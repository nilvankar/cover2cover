from flask_sqlalchemy import  SQLAlchemy
from app import db
class User(SQLAlchemy):
    id=db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String(80), unique=True, nullable=False)
    email=db.Column(db.String(120), unique=True, nullable=False)
    password=db.Column(db.String(80), nullable=False)
    confirm_password=db.Column(db.String(80), nullable=False)



