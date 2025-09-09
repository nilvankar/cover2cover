from app import app, popular_df, jsonify, request, pt, similarity, books
import numpy as np
from app import users_collection, books_collection, ratings_collection
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import bcrypt
from datetime import datetime, timedelta
import re

# Helper functions
def hash_password(password):
    """Hash a password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password, hashed_password):
    """Verify a password against its hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def is_valid_email(email):
    """Basic email validation"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

# Routes
@app.route('/')
def index():
    return 'Book Recommendation System API'

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validation
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({'status': 'error', 'message': 'Email and password are required'}), 400
        
        if not is_valid_email(data['email']):
            return jsonify({'status': 'error', 'message': 'Invalid email format'}), 400
        
        if len(data['password']) < 6:
            return jsonify({'status': 'error', 'message': 'Password must be at least 6 characters'}), 400
        
        # Check if user already exists
        if users_collection.find_one({'email': data['email']}):
            return jsonify({'status': 'error', 'message': 'User already exists'}), 409
        
        # Create new user
        user_data = {
            'email': data['email'],
            'password_hash': hash_password(data['password']),
            'name': data.get('name', ''),
            'created_at': datetime.utcnow(),
            'last_login': datetime.utcnow(),
            'preferences': {
                'favorite_genres': [],
                'preferred_languages': ['English']
            }
        }
        
        # Insert user
        result = users_collection.insert_one(user_data)
        
        # Create JWT token
        access_token = create_access_token(
            identity=str(result.inserted_id),
            expires_delta=timedelta(days=7)
        )
        
        return jsonify({
            'status': 'success',
            'message': 'User created successfully',
            'token': access_token,
            'user': {
                'id': str(result.inserted_id),
                'email': data['email'],
                'name': data.get('name', '')
            }
        }), 201
        
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({'status': 'error', 'message': 'Email and password are required'}), 400
        
        # Find user
        user = users_collection.find_one({'email': data['email']})
        if not user or not verify_password(data['password'], user['password_hash']):
            return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401
        
        # Update last login
        users_collection.update_one(
            {'_id': user['_id']},
            {'$set': {'last_login': datetime.utcnow()}}
        )
        
        # Create JWT token
        access_token = create_access_token(
            identity=str(user['_id']),
            expires_delta=timedelta(days=7)
        )
        
        return jsonify({
            'status': 'success',
            'message': 'Login successful',
            'token': access_token,
            'user': {
                'id': str(user['_id']),
                'email': user['email'],
                'name': user.get('name', '')
            }
        })
        
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/books', methods=['GET'])
def get_books():
    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        skip = (page - 1) * limit
        
        # Get books from MongoDB with pagination
        books_data = list(books_collection.find(
            {}, 
            {'_id': 0, 'password_hash': 0}  # Exclude sensitive fields
        ).skip(skip).limit(limit))
        
        total_books = books_collection.count_documents({})
        
        return jsonify({
            'status': 'success',
            'data': books_data,
            'pagination': {
                'page': page,
                'limit': limit,
                'total': total_books,
                'pages': (total_books + limit - 1) // limit
            }
        })
        
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        user_id = get_jwt_identity()
        user = users_collection.find_one(
            {'_id': user_id},
            {'password_hash': 0}  # Don't return password hash
        )
        
        if not user:
            return jsonify({'status': 'error', 'message': 'User not found'}), 404
        
        user['_id'] = str(user['_id'])  # Convert ObjectId to string
        
        return jsonify({
            'status': 'success',
            'data': user
        })
        
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/recommend_books', methods=['GET'])
@jwt_required()  # Requires authentication
def recommend():
    try:
        user_id = get_jwt_identity()  # Get user ID from JWT token
        
        # Get book title from query parameters
        book_title = request.args.get('title')

        if not book_title:
            return jsonify({
                'status': 'error',
                'message': 'Book title parameter is required'
            }), 400

        # Find the index of the book
        if book_title not in pt.index:
            return jsonify({
                'status': 'error',
                'message': 'Book not found in database'
            }), 404

        index = np.where(pt.index == book_title)[0][0]

        # Get similar books
        similar_books = sorted(list(enumerate(similarity[index])),
                               key=lambda x: x[1], reverse=True)[1:11]

        # Prepare the response data
        recommendations = []
        for i in similar_books:
            temp_df = books[books['Book-Title'] == pt.index[i[0]]]
            book_data = temp_df.drop_duplicates('Book-Title').iloc[0]

            recommendations.append({
                'title': book_data['Book-Title'],
                'author': book_data['Book-Author'],
                'image_url': book_data['Image-URL-M'],
                'similarity_score': float(i[1])
            })

        # Log this recommendation for the user (optional)
        ratings_collection.insert_one({
            'user_id': user_id,
            'book_title': book_title,
            'action': 'viewed_recommendations',
            'timestamp': datetime.utcnow(),
            'recommendations': [rec['title'] for rec in recommendations]
        })

        return jsonify({
            'status': 'success',
            'book_requested': book_title,
            'recommendations': recommendations,
            'count': len(recommendations)
        })

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/testdb')
def test_db():
    try:
        # Test MongoDB connection
        client.admin.command('ping')
        
        # Test collections
        users_count = users_collection.count_documents({})
        books_count = books_collection.count_documents({})
        
        return jsonify({
            'status': 'success',
            'message': 'MongoDB Atlas connection successful!',
            'stats': {
                'users': users_count,
                'books': books_count
            }
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Connection failed: {str(e)}'
        }), 500