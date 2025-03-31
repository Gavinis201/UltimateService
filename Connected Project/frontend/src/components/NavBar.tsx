import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import logoImage from '../assets/Untitled design.png';

interface NavBarProps {
  onMenuToggle: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onMenuToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    onMenuToggle();
  };

  return (
    <div className="navbar">
      <button className="circle-button menu-button" onClick={handleMenuClick}>
        <div className="hamburger-icon">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </button>
      
      <div className="navbar-center">
        <Link to="/" className="logo-link">
          <div className="logo-container">
            <img src={logoImage} alt="Wakefield Ward Logo" className="logo" />
          </div>
        </Link>
      </div>
      
      <Link to="/profile" className="profile-link">
        <div className="circle-button profile-button">
          <div className="profile-icon">
            <div className="user-head"></div>
            <div className="user-body"></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NavBar; 