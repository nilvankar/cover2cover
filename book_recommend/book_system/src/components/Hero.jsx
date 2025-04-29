// components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

const Hero = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        const data = await response.json();
        console.log(data);
        
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div className="text-center my-5">Loading books...</div>;
  }

  return (
    <div className="hero-section">
      <Carousel fade indicators={false} controls={false}>
        {books.slice(0, 5).map((book) => (
          <Carousel.Item key={book['Book-Title']} interval={3000}>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <img
                    src={book['Image-URL-M'] || 'https://via.placeholder.com/300x450'}
                    alt={book['Book-Title']}
                    className="img-fluid rounded shadow-lg"
                    style={{ maxHeight: '450px' }}
                  />
                </div>
                <div className="col-md-6 text-white">
                  <h1 className="display-4 fw-bold">{book['Book-Title']}</h1>
                  <p className="lead">by {book['Book-Author']}</p>
                  <div className="d-flex align-items-center mb-3">
                    <span className="text-warning me-2">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`bi bi-star${i < Math.floor(book['avg_rating']) ? '-fill' : ''}`}
                        />
                      ))}
                    </span>
                    <span>({book['num_ratings']} ratings)</span>
                  </div>
                  <p className="text-muted">Published: {book['Year-Of-Publication']}</p>
                  <button className="btn btn-light btn-lg mt-3">View Details</button>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;