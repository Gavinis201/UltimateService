import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SideMenu.css';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear login state
    localStorage.removeItem('isLoggedIn');
    
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('loginStateChange'));
    
    // Close the menu
    onClose();
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <h2>Menu</h2>
        </div>
        <nav className="menu-nav">
          <ul>
            <li>
              <Link to="/" onClick={onClose}>Home</Link>
            </li>
            <li>
              <Link to="/group-info" onClick={onClose}>Group Info</Link>
            </li>
            <li>
              <Link to="/event-list" onClick={onClose}>Event List</Link>
            </li>
            <li>
              <Link to="/add-event" onClick={onClose}>Add Event</Link>
            </li>
            <li>
              <Link to="/past-events" onClick={onClose}>Past Events</Link>
            </li>
            <li>
              <Link to="/profile" onClick={onClose}>Profile</Link>
            </li>
          </ul>
        </nav>
        
        <div className="menu-footer">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SideMenu; 