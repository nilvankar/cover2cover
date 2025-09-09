import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv('MONGO_URI')
print("Testing MongoDB connection...")

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    client.admin.command('ping')
    print("✅ MongoDB Atlas connection successful!")
    
    # List databases
    dbs = client.list_database_names()
    print(f"Available databases: {dbs}")
    
except Exception as e:
    print(f"❌ Connection failed: {e}")
    print("Please check:")
    print("1. Your IP is whitelisted in Network Access")
    print("2. Database user credentials are correct")
    print("3. Cluster is deployed and running")