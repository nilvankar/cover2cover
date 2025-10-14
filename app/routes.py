from flask import Blueprint, jsonify, request, current_app
from flask_login import login_required
import numpy as np

main = Blueprint('main', __name__)

@main.route('/api/books', methods=['GET'])
def get_books():
    books_data = current_app.popular_df.to_dict('records')
    return jsonify({
        'status': 'success',
        'data': books_data,
        'count': len(books_data)
    })


@main.route('/recommend_books', methods=['GET'])
@login_required
def recommend():
    book_title = request.args.get('title')
    if not book_title:
        return jsonify({'status': 'error', 'message': 'Book title required'}), 400

    pt = current_app.pt
    similarity = current_app.similarity
    books = current_app.books

    if book_title not in pt.index:
        return jsonify({'status': 'error', 'message': 'Book not found'}), 404

    index = np.where(pt.index == book_title)[0][0]
    similar_books = sorted(list(enumerate(similarity[index])),
                           key=lambda x: x[1], reverse=True)[1:11]

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

    return jsonify({
        'status': 'success',
        'book_requested': book_title,
        'recommendations': recommendations
    })
