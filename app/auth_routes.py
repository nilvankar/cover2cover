from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from app.models import User
from app.extension import db

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([username, email, password]):
        return jsonify({'status': 'error', 'message': 'All fields required'}), 400

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({'status': 'error', 'message': 'User already exists'}), 400

    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'status': 'success', 'message': 'Registered successfully'}), 201


@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401

    login_user(user)
    return jsonify({'status': 'success', 'message': 'Login successful', 'user': user.username})


@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'status': 'success', 'message': 'Logged out'})


@auth.route('/check_session', methods=['GET'])
def check_session():
    if current_user.is_authenticated:
        return jsonify({'authenticated': True, 'user': current_user.username})
    return jsonify({'authenticated': False})
