# app/auth_routes.py
from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.security import generate_password_hash
from app.extension import db
from app.models import User

# Use a consistent blueprint name
auth = Blueprint('auth', __name__)

# -------- Register ----------
@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not all([username, email, password]):
        return jsonify({'status': 'error', 'message': 'All fields required'}), 400

    # check duplicates
    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({'status': 'error', 'message': 'User already exists'}), 400

    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'status': 'success', 'message': 'Registered successfully'}), 201


# -------- Login ----------
@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'status': 'error', 'message': 'Username and password required'}), 400

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401

    login_user(user)
    return jsonify({'status': 'success', 'message': 'Login successful', 'user': user.username})


# -------- Logout ----------
@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'status': 'success', 'message': 'Logged out'})


# -------- Check Session ----------
@auth.route('/check_session', methods=['GET'])
def check_session():
    if current_user.is_authenticated:
        return jsonify({'authenticated': True, 'user': current_user.username})
    return jsonify({'authenticated': False})


# -------- Profile (protected) ----------
@auth.route('/profile', methods=['GET'])
@login_required
def profile():
    user_data = {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
    }
    return jsonify({"status": "success", "user": user_data})


# -------- Forgot Password (simple flow) ----------
@auth.route('/forgot_password', methods=['POST'])
def forgot_password():
    data = request.get_json() or {}
    email = data.get('email')

    if not email:
        return jsonify({'status': 'error', 'message': 'Email is required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'status': 'error', 'message': 'No account with that email'}), 404

    # Temporary simple reset (DO NOT use in production)
    temp_password = "Temp1234"
    user.password_hash = generate_password_hash(temp_password)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Temporary password has been set to 'Temp1234'. Please login and change it."
    })
