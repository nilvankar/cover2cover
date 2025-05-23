from app import app,popular_df,jsonify,request,pt,similarity,books
import  numpy as np
from app import db


@app.route('/api/books', methods=['GET'])
def get_books():
    # Convert DataFrame to list of dictionaries
    books_data = popular_df.to_dict('records')
    return jsonify({
        'status': 'success',
        'data': books_data,
        'count': len(books_data)
    })


@app.route('/about')
def suggest():
    return "about"


@app.route('/recommend_books', methods=['GET'])
def recommend():
    try:
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
                'similarity_score': float(i[1])  # Convert numpy float to Python float
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
        db.command('ping')  # Simple ping to check connection
        return "✅ MongoDB Atlas connection successful!"
    except Exception as e:
        return f"❌ Connection failed: {str(e)}"