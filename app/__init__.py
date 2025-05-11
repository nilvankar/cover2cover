from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pickle as pkl
from pymongo import MongoClient
from flask_sqlalchemy import  SQLAlchemy
app = Flask(__name__)
CORS(app)

MONGO_URI="mongodb+srv://vankar262:p5EBSsDIlX3cQJqn@main.na4ativ.mongodb.net/?retryWrites=true&w=majority&appName=main"
client=MongoClient(MONGO_URI)
db=client['book_recommend']
# Load the data files
popular_df = pkl.load(open('popular.pkl', 'rb'))
pt = pkl.load(open('pt.pkl', 'rb'))
similarity = pkl.load(open('similarity.pkl', 'rb'))
books = pkl.load(open('books.pkl', 'rb'))


if __name__ == '__main__':
    app.run(debug=True)
from app import routes