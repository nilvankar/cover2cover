# app/__init__.py
from flask import Flask
from flask_cors import CORS
from app.extension import db, login_manager
import pickle as pkl
import os
from dotenv import load_dotenv  

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)

    app.config['SECRET_KEY'] = 'supersecretkey'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/bookrecommend'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    login_manager.init_app(app)

    # --- Load ML data ---
    app.popular_df = pkl.load(open('popular.pkl', 'rb'))
    app.pt = pkl.load(open('pt.pkl', 'rb'))
    app.similarity = pkl.load(open('similarity.pkl', 'rb'))
    app.books = pkl.load(open('books.pkl', 'rb'))

    # --- Register Blueprints ---
    from app.auth_routes import auth
    from app.routes.books_routes import books_bp  # ✅ import directly from app/
    
    app.register_blueprint(auth, url_prefix='/api/auth')
    app.register_blueprint(books_bp)       # ✅ now /api/books/* routes will work

    return app
