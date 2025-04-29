import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const location = useLocation();
  
  // Get the book title from URL params or location state
  const queryParams = new URLSearchParams(location.search);
  const bookTitle = queryParams.get('title') || location.state?.title || 'The Alchemist';

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:5000/recommend_books?title=${encodeURIComponent(bookTitle)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setRecommendations(data);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError(err.message);
        // Fallback to sample data if API fails
        setRecommendations(getSampleData());
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [bookTitle]);

  // Sample data fallback
  const getSampleData = () => [
    {
      id: 7,
      title: 'Dune',
      author: 'Frank Herbert',
      genre: 'Sci-Fi',
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg'
    },
    {
      id: 8,
      title: 'The Song of Achilles',
      author: 'Madeline Miller',
      genre: 'Historical Fiction',
      rating: 4.6,
      image: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg'
    },
    {
      id: 9,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      genre: 'Non-Fiction',
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg'
    }
  ];

  const handleGenreFilter = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredBooks = selectedGenre === 'All Genres' 
    ? recommendations 
    : recommendations.filter(book => book.genre === selectedGenre);

  if (loading) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning">
          <h4>Couldn't fetch recommendations</h4>
          <p>{error}</p>
          <p>Showing sample data instead.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-page">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Recommendations based on: {bookTitle}</h1>
          <div className="dropdown">
            <button 
              className="btn btn-outline-secondary dropdown-toggle" 
              type="button" 
              id="filterDropdown" 
              data-bs-toggle="dropdown"
            >
              {selectedGenre}
            </button>
            <ul className="dropdown-menu" aria-labelledby="filterDropdown">
              <li>
                <button 
                  className="dropdown-item" 
                  onClick={() => handleGenreFilter('All Genres')}
                >
                  All Genres
                </button>
              </li>
              {[...new Set(recommendations.map(book => book.genre))].map(genre => (
                <li key={genre}>
                  <button 
                    className="dropdown-item" 
                    onClick={() => handleGenreFilter(genre)}
                  >
                    {genre}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {filteredBooks.length === 0 ? (
          <div className="alert alert-info">
            No recommendations found for this genre. Try another filter.
          </div>
        ) : (
          <div className="row">
            {filteredBooks.map(book => (
              <BookCard key={book.id || book.title} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;