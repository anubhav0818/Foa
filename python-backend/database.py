from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb+srv://anubhav0818:Anubhav20874@cluster0.j3rpuwk.mongodb.net/?appName=Cluster0"
DB_NAME = "FOA"

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

# Collections (matching your Node models)
submission_collection = db["Submission"]
site_collection = db["Site"]
kpi_collection = db["KPI"]
