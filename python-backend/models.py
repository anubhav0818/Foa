# models.py

from typing import List, Optional
from bson import ObjectId
from pydantic import BaseModel, Field, ConfigDict
from pydantic import GetCoreSchemaHandler
from pydantic_core import core_schema


# -----------------------------
# Correct ObjectId handler
# -----------------------------
class PyObjectId(str):
    """
    Proper Pydantic v2 compatible ObjectId type.
    Avoids schema generation errors in /docs.
    """

    @classmethod
    def __get_pydantic_core_schema__(
        cls, source_type, handler: GetCoreSchemaHandler
    ):
        # validate string → return valid ObjectId string
        return core_schema.no_info_after_validator_function(
            cls.validate, core_schema.str_schema()
        )

    @classmethod
    def validate(cls, value):
        if isinstance(value, ObjectId):
            return str(value)
        if isinstance(value, str) and ObjectId.is_valid(value):
            return value
        raise ValueError("Invalid ObjectId")


# -----------------------------
# Common MongoDB model
# -----------------------------
class MongoModel(BaseModel):
    id: PyObjectId = Field(alias="_id")

    model_config = ConfigDict(
        populate_by_name=True,  # allow _id → id mapping
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
    )


# -----------------------------
# SUBMISSION MODELS
# -----------------------------
class SubmissionBase(BaseModel):
    submissionId: str
    foaId: str
    vendor: str
    status: str = "In-Review"
    location: Optional[str] = None
    totalSites: int = 0


# class SubmissionCreate(SubmissionBase):
#     pass

class SubmissionCreate(BaseModel):
    foaId: str
    submissionId: str
    location: str
    vendor: str
    status: str
    totalSites: int = 0
    createdBy: str   # ← ADD THIS



class SubmissionOut(SubmissionBase, MongoModel):
    pass


# -----------------------------
# SITE MODELS
# -----------------------------
class SiteBase(BaseModel):
    siteId: str
    voice: int
    sa: int
    nsa: int
    common: int


class SiteCreate(SiteBase):
    submissionId: str   # FK as string


class SiteOut(SiteBase, MongoModel):
    submissionId: PyObjectId


# -----------------------------
# KPI MODELS
# -----------------------------
class KpiBase(BaseModel):
    category: str
    kpiType: str

    kpiName: str
    type: str

    preMedian: Optional[float] = None
    postMedian: Optional[float] = None
    percentChange: Optional[float] = None

    improvedSites: Optional[int] = None
    degradedSites: Optional[int] = None
    noChangeSites: Optional[int] = None


class KpiCreate(KpiBase):
    submissionId: str  # FK string


class KpiOut(KpiBase, MongoModel):
    submissionId: PyObjectId