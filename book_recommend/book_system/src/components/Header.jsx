import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookOpen, FaSearch, FaUser } from 'react-icons/fa';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleRecommendationClick = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/recommend_books', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log('Recommendation data:', data);
      // You might want to navigate to a recommendations page or display the data
      navigate('/recommendations', { state: { books: data } });
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/search_books?query=${encodeURIComponent(searchQuery)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log('Search results:', data);
      // Navigate to search results page or display the data
      navigate('/search', { state: { results: data, query: searchQuery } });
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaBookOpen className="me-2" />
          BookRec
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-link" 
                onClick={handleRecommendationClick}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Recommendations
              </button>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
          <div className="d-flex">
            <form className="input-group me-2" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit">
                <FaSearch />
              </button>
            </form>
            <button className="btn btn-outline-light">
              <FaUser /> Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;