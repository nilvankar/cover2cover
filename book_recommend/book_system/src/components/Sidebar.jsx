import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaStar, FaHistory, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar p-3 d-flex flex-column">
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white d-flex align-items-center">
            <FaHome className="me-2" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/recommendations" className="nav-link text-white d-flex align-items-center">
            <FaBook className="me-2" />
            Recommendations
          </Link>
        </li>
        <li>
          <Link to="#" className="nav-link text-white d-flex align-items-center">
            <FaStar className="me-2" />
            Favorites
          </Link>
        </li>
        <li>
          <Link to="#" className="nav-link text-white d-flex align-items-center">
            <FaHistory className="me-2" />
            Reading History
          </Link>
        </li>
      </ul>
      <hr className="bg-secondary" />
      <ul className="nav nav-pills flex-column">
        <li>
          <Link to="#" className="nav-link text-white d-flex align-items-center">
            <FaCog className="me-2" />
            Settings
          </Link>
        </li>
        <li>
          <Link to="#" className="nav-link text-white d-flex align-items-center">
            <FaSignOutAlt className="me-2" />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;