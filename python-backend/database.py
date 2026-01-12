import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load .env only in local environment
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "FOA")

if not MONGO_URI:
    raise RuntimeError("MONGO_URI is not set in environment variables")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

# Collections
submission_collection = db["Submission"]
site_collection = db["Site"]
kpi_collection = db["KPI"]
