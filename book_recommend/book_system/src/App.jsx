import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
// import Recommendations from './pages/Recommendations';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    
      <div className="app-container d-flex flex-column min-vh-100">
        <Header />
        <div className="main-content d-flex flex-grow-1">
          <Sidebar />
          <div className="content flex-grow-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {
                // <Route path="/recommendations" element={<Recommendations />} />
                
              }
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    
  );
}

export default App;