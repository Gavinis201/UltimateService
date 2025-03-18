import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import SideMenu from './components/SideMenu'
import HomePage from './pages/HomePage'
import GroupInfoPage from './pages/GroupInfoPage'
import EventListPage from './pages/EventListPage'
import PastEventsPage from './pages/PastEventsPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import './styles/global.css'
import './App.css'

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true')

  useEffect(() => {
    // Check if user is logged in on mount
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };

    // Initial check
    checkLoginStatus();

    // Set up event listener for login state changes
    window.addEventListener('storage', checkLoginStatus);
    
    // Set up a custom event listener for login state changes from within the app
    const handleLoginChange = () => {
      checkLoginStatus();
    };
    
    window.addEventListener('loginStateChange', handleLoginChange);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('loginStateChange', handleLoginChange);
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <Router>
      <div className="app">
        {isLoggedIn && (
          <>
            <NavBar onMenuToggle={handleMenuToggle} />
            <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
          </>
        )}
        
        <main className={isLoggedIn ? "main-content" : ""}>
          <Routes>
            <Route path="/login" element={<LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />} />
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/group-info" element={
              <ProtectedRoute>
                <GroupInfoPage />
              </ProtectedRoute>
            } />
            <Route path="/event-list" element={
              <ProtectedRoute>
                <EventListPage />
              </ProtectedRoute>
            } />
            <Route path="/past-events" element={
              <ProtectedRoute>
                <PastEventsPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
