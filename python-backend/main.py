from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from bson import ObjectId

from database import submission_collection, site_collection, kpi_collection
from models import (
    SubmissionCreate, SubmissionOut,
    SiteCreate, SiteOut,
    KpiCreate, KpiOut,
    PyObjectId
)

app = FastAPI(title="FOA FastAPI Backend with New Schema")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,  # Allow cookies to be included in cross-origin requests
    allow_methods=["*"],     # Allow all standard HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],     # Allow all headers in cross-origin requests
)

# Convert ObjectId recursively
def convert_objectid(doc):
    if isinstance(doc, list):
        return [convert_objectid(item) for item in doc]

    if isinstance(doc, dict):
        new_doc = {}
        for k, v in doc.items():
            if isinstance(v, ObjectId):
                new_doc[k] = str(v)
            else:
                new_doc[k] = convert_objectid(v)
        return new_doc

    return doc


# Insert helper
async def insert_and_return(coll, data):
    result = await coll.insert_one(data)
    return await coll.find_one({"_id": result.inserted_id})


# Get all helper
async def find_all(coll):
    items = []
    cursor = coll.find({})
    async for doc in cursor:
        items.append(doc)
    return items


async def find_one_by_id(coll, id_str: str):
    try:
        obj_id = ObjectId(id_str)
    except Exception:
        raise HTTPException(400, "Invalid id format")

    doc = await coll.find_one({"_id": obj_id})
    if not doc:
        raise HTTPException(404, "Record not found")

    return doc

async def find_one_by_submission_id(submission_id: str):
    doc = await submission_collection.find_one({"submissionId": submission_id})

    if not doc:
        raise HTTPException(status_code=404, detail="Submission not found")

    return doc
# ---------------- SUBMISSION ROUTES ----------------

@app.post("/submissions", response_model=SubmissionOut)
async def create_submission(payload: SubmissionCreate):
    existing = await submission_collection.find_one({"submissionId": payload.submissionId})
    if existing:
        raise HTTPException(400, "submissionId already exists")

    doc = payload.dict()
    # created = await insert_and_return(submission_collection, doc)

    if "createdBy" not in doc or not doc["createdBy"]:
        doc["createdBy"] = "John Smith"  # You will later change this to logged-in user

    created = await insert_and_return(submission_collection, doc)

    # return prepare_response(created)
    return convert_objectid(created)

@app.get("/submissions", response_model=List[SubmissionOut])
async def list_submissions():
    docs = await find_all(submission_collection)
    # return [prepare_response(d) for d in docs]
    return convert_objectid(docs)


@app.get("/submissions/{submission_id}", response_model=SubmissionOut)
async def get_submission(submission_id: str):
    doc = await find_one_by_submission_id(submission_id)
    return convert_objectid(doc)


@app.get("/submissions/{submission_id}/full")
async def get_submission_full(submission_id: str):
    """
    Returns submission + sites + kpis + summary
    """

    # 1️⃣ Fetch submission using submissionId (string)
    submission = await submission_collection.find_one({"submissionId": submission_id})
    if not submission:
        raise HTTPException(404, "Submission not found")

    # 2️⃣ Extract actual Mongo ObjectId stored in sites & kpis
    sub_obj_id = submission["_id"]   # <---- IMPORTANT

    # 3️⃣ Fetch sites -> their submissionId is this ObjectId
    sites_cursor = site_collection.find({"submissionId": sub_obj_id})
    sites = [convert_objectid(doc) async for doc in sites_cursor]

    # 4️⃣ Fetch KPIs -> their submissionId is this ObjectId
    kpi_cursor = kpi_collection.find({"submissionId": sub_obj_id})
    kpis = [convert_objectid(doc) async for doc in kpi_cursor]

    # 5️⃣ KPI Summary
    def count_values(field):
        return {
            "green": sum(1 for s in sites if s.get(field) == 1),
            "red": sum(1 for s in sites if s.get(field) == -1),
            "orange": sum(1 for s in sites if s.get(field) == 0),
        }

    kpi_summary = {
        "voice": count_values("voice"),
        "sa": count_values("sa"),
        "nsa": count_values("nsa"),
        "common": count_values("common"),
    }

    # 6️⃣ Convert submission for frontend
    submission = convert_objectid(submission)

    # 7️⃣ Attach relations
    submission["sites"] = sites
    submission["kpis"] = kpis
    submission["kpiSummary"] = kpi_summary

    return submission

# ---------------- SITE ROUTES ----------------

@app.post("/sites", response_model=SiteOut)
async def create_site(payload: SiteCreate):
    # Validate FK: submissionId
    try:
        sub_id = ObjectId(payload.submissionId)
    except:
        raise HTTPException(400, "Invalid submissionId")

    submission = await submission_collection.find_one({"_id": sub_id})
    if not submission:
        raise HTTPException(404, "Submission not found")

    doc = payload.dict()
    doc["submissionId"] = sub_id

    created = await insert_and_return(site_collection, doc)

    # increment total sites
    await submission_collection.update_one(
        {"_id": sub_id},
        {"$inc": {"totalSites": 1}}
    )

    # created["id"] = str(created["_id"])
    # del created["_id"]
    # return prepare_response(created)

    return convert_objectid(created)


@app.get("/sites", response_model=List[SiteOut])
async def list_sites():
    docs = await find_all(site_collection)
    return convert_objectid(docs)


@app.get("/sites/{site_id}", response_model=SiteOut)
async def get_site(site_id: str):
    doc = await find_one_by_id(site_collection, site_id)
    return convert_objectid(doc)

# ---------------- KPI ROUTES ----------------

@app.post("/kpis", response_model=KpiOut)
async def create_kpi(payload: KpiCreate):
    # Validate FK: submissionId
    try:
        sub_id = ObjectId(payload.submissionId)
    except:
        raise HTTPException(400, "Invalid submissionId")

    submission = await submission_collection.find_one({"_id": sub_id})
    if not submission:
        raise HTTPException(404, "Submission not found")

    doc = payload.dict()
    doc["submissionId"] = sub_id

    created = await insert_and_return(kpi_collection, doc)

    # return prepare_response(created)
    return convert_objectid(created)


@app.get("/kpis", response_model=List[KpiOut])
async def list_kpis():
    docs = await find_all(kpi_collection)
    return convert_objectid(docs)


@app.get("/kpis/{kpi_id}", response_model=KpiOut)
async def get_kpi(kpi_id: str):
    doc = await find_one_by_id(kpi_collection, kpi_id)
    return convert_objectid(doc)
