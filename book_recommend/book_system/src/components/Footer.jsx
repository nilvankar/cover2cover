import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>BookRec</h5>
            <p className="text-muted">
              Your personal book recommendation system helping you discover your next favorite read.
            </p>
          </div>
          <div className="col-md-2 mb-3">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/recommendations" className="text-white">Recommendations</a></li>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Contact</h5>
            <ul className="list-unstyled text-muted">
              <li>Email: info@bookrec.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Book St, Readville</li>
            </ul>
          </div>
          <div className="col-md-3 mb-3">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="#" className="text-white me-2"><FaFacebook /></a>
              <a href="#" className="text-white me-2"><FaTwitter /></a>
              <a href="#" className="text-white me-2"><FaInstagram /></a>
              <a href="#" className="text-white"><FaLinkedin /></a>
            </div>
          </div>
        </div>
        <hr className="my-4 bg-secondary" />
        <div className="text-center text-muted">
          <small>&copy; {new Date().getFullYear()} BookRec. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;