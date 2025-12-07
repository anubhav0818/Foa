from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb://localhost:27017"  # same as Compass
DB_NAME = "FOA"

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

# Collections (matching your Node models)
submission_collection = db["Submission"]
site_collection = db["Site"]
kpi_collection = db["KPI"]