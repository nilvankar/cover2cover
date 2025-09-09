from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pickle as pkl
from pymongo import MongoClient
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv
import urllib.parse
from datetime import datetime, timedelta

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'fallback_secret_key_change_in_production')
jwt = JWTManager(app)

# MongoDB Connection with better error handling
try:
    MONGO_URI = os.getenv('MONGO_URI')
    
    if not MONGO_URI:
        raise ValueError("MONGO_URI environment variable is not set")
    
    # Print the URI (without password) for debugging
    print("Attempting to connect to MongoDB...")
    
    # Connect with longer timeout and SSL
    client = MongoClient(
        MONGO_URI,
        serverSelectionTimeoutMS=10000,  # 10 second timeout
        connectTimeoutMS=10000,
        socketTimeoutMS=10000,
        retryWrites=True,
        w="majority"
    )
    
    # Test the connection immediately
    client.admin.command('ping')
    print("✅ MongoDB connection successful!")
    
    # Initialize database and collections
    db = client['book_recommend']
    users_collection = db['users']
    books_collection = db['books']
    ratings_collection = db['ratings']
    
except Exception as e:
    print(f"❌ MongoDB connection failed: {e}")
    print("Please check your MONGO_URI in the .env file")
    print("Format should be: mongodb+srv://username:password@cluster.mongodb.net/")
    
    # Create a dummy client for development without MongoDB
    client = None
    db = None
    users_collection = None
    books_collection = None
    ratings_collection = None

# Load the ML model data files
try:
    popular_df = pkl.load(open('popular.pkl', 'rb'))
    pt = pkl.load(open('pt.pkl', 'rb'))
    similarity = pkl.load(open('similarity.pkl', 'rb'))
    books_ml = pkl.load(open('books_df.pkl', 'rb'))  # Renamed to avoid conflict
    
except FileNotFoundError as e:
    print(f"⚠️ Model file not found: {e}")
    popular_df = None
    pt = None
    similarity = None
    books_ml = None
except Exception as e:
    print(f"⚠️ Error loading model files: {e}")
    popular_df = None
    pt = None
    similarity = None
    books_ml = None

# Import routes after initializing everything


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)