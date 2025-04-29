// pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
// import BookCard from '../components/BookCard';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      
      {/* Rest of your home page content */}
      <section className="featured-books my-5">
        <div className="container">
          <h2 className="mb-4">Featured Books</h2>
          <div className="row">
            {/* Your book cards */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;