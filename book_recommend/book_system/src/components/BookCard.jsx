import React from 'react';
import Rating from './Rating';

const BookCard = ({ book }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card book-card h-100">
        <img
          src={book.image || 'https://via.placeholder.com/150x200'}
          className="card-img-top"
          alt={book.title}
        />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text text-muted">{book.author}</p>
          <Rating rating={book.rating} />
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="badge bg-primary">{book.genre}</span>
            <button className="btn btn-sm btn-outline-primary">Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;