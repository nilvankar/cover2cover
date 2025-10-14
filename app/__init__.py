from flask import Flask
from flask_cors import CORS
from app.extension import db, login_manager
import pickle as pkl

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)

    app.config['SECRET_KEY'] = 'supersecretkey'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/bookrecommend'

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    login_manager.init_app(app)

    # --- Load ML Data ---
    app.popular_df = pkl.load(open('popular.pkl', 'rb'))
    app.pt = pkl.load(open('pt.pkl', 'rb'))
    app.similarity = pkl.load(open('similarity.pkl', 'rb'))
    app.books = pkl.load(open('books.pkl', 'rb'))

    # --- Import and register blueprints ---
    from app.routes import main
    from app.auth_routes import auth
    app.register_blueprint(main)
    app.register_blueprint(auth, url_prefix='/api/auth')

    return app
