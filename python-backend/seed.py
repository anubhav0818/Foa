import pymongo
from bson import ObjectId

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["FOA"]

def seed():
    print("\n--- Seeding FOA Database ---\n")

    # Clear existing data (optional)
    db.FoaSubmission.delete_many({})
    db.Site.delete_many({})
    db.KpiGroup.delete_many({})
    db.Kpi.delete_many({})

    # 1️⃣ Insert FOA Submission
    foa_doc = {
        "submissionId": "TAM-002-01",
        "foaId": "TAM-001",
        "vendor": "Ericsson",
        "status": "In-Review",
        "totalSites": 2,
        "location": "Mumbai",
        "sites": []   # will push site IDs later
    }

    foa_id = db.FoaSubmission.insert_one(foa_doc).inserted_id
    print("Inserted FOA Submission:", foa_id)

    # 2️⃣ Insert Sites
    sites_data = [
        {
            "siteId": "CTNH515A",
            "foaSubmission": foa_id,
            "categoryStatus": {
                "voice": "strong",
                "sa": "mild",
                "nsa": "mild_neg",
                "common": "strong"
            }
        },
        {
            "siteId": "CHYH013A",
            "foaSubmission": foa_id,
            "categoryStatus": {
                "voice": "mild",
                "sa": "strong",
                "nsa": "mild",
                "common": "mild_neg"
            }
        }
    ]

    site_ids = []
    for site in sites_data:
        _id = db.Site.insert_one({**site, "kpiGroups": []}).inserted_id
        site_ids.append(_id)

    print("Inserted Sites:", site_ids)

    # Update FOA with site references
    db.FoaSubmission.update_one(
        {"_id": foa_id},
        {"$set": {"sites": site_ids}}
    )

    # 3️⃣ Insert KPI Groups + KPIs FOR EACH SITE
    def create_kpi_group(site_id, groupName, category, kpis):
        kpi_ids = []
        # insert KPIs first
        for k in kpis:
            k_id = db.Kpi.insert_one({**k, "group": None}).inserted_id
            kpi_ids.append(k_id)

        # insert KPI group
        kpi_group_doc = {
            "groupName": groupName,
            "category": category,
            "site": site_id,
            "kpis": kpi_ids
        }

        kpi_group_id = db.KpiGroup.insert_one(kpi_group_doc).inserted_id

        # update KPIs to reference group
        db.Kpi.update_many(
            {"_id": {"$in": kpi_ids}},
            {"$set": {"group": kpi_group_id}}
        )

        # attach group to site
        db.Site.update_one(
            {"_id": site_id},
            {"$addToSet": {"kpiGroups": kpi_group_id}}
        )

        return kpi_group_id


    # Site 1 KPI Groups
    create_kpi_group(
        site_ids[0],
        "Retainability",
        "Voice",
        [
            {
                "kpiName": "SIP 5G DCR",
                "type": "MPD",
                "preMedian": 0.216,
                "postMedian": 0.12,
                "percentChange": -44.4,
                "improvedSites": 1,
                "degradedSites": 0,
                "noChangeSites": 0
            },
            {
                "kpiName": "SIP VoLTE DCR",
                "type": "MPD",
                "preMedian": 0.0,
                "postMedian": 0.0,
                "percentChange": 0.0,
                "improvedSites": 0,
                "degradedSites": 0,
                "noChangeSites": 1
            }
        ]
    )

    # Site 2 KPI Group
    create_kpi_group(
        site_ids[1],
        "Accessibility",
        "Voice",
        [
            {
                "kpiName": "Accessibility Metric X",
                "type": "MPD",
                "preMedian": 1.1,
                "postMedian": 0.95,
                "percentChange": -13.6,
                "improvedSites": 0,
                "degradedSites": 1,
                "noChangeSites": 0
            }
        ]
    )

    print("\n--- Seeding Completed Successfully ---\n")



