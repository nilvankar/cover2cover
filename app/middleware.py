from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from app import users_collection

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            user = users_collection.find_one({'_id': user_id})
            
            if not user:
                return jsonify({
                    'status': 'error', 
                    'message': 'Invalid token'
                }), 401
                
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({
                'status': 'error',
                'message': 'Authentication required'
            }), 401
    return decorated_function