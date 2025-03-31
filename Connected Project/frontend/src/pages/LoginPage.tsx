import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import logoImage from '../assets/Untitled design.png';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Demo login functionality (replace with actual auth implementation)
    if (isLogin) {
      // Simulate successful login
      console.log('Logging in with:', { email, password });
      localStorage.setItem('isLoggedIn', 'true');
      
      // Notify parent component of successful login
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
      // Dispatch a custom event to notify other components of login state change
      window.dispatchEvent(new Event('loginStateChange'));
      
      navigate('/');
    } else {
      // Simulate registration
      console.log('Registering with:', { email, password });
      setIsLogin(true);
      setError('');
      setEmail('');
      setPassword('');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="login-page">
      <div className="login-container fade-in">
        <div className="logo-section">
          <div className="login-logo-container">
            <img src={logoImage} alt="Wakefield Ward Logo" className="login-logo" />
          </div>
          <h1 className="app-name">Ultimate Service</h1>
          <p className="app-tagline">Connect, Serve, Create Impact</p>
        </div>
        
        <div className="form-section">
          <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            {isLogin && (
              <div className="forgot-password">
                <a href="#">Forgot password?</a>
              </div>
            )}
            
            <button type="submit" className="login-button">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>
          
          <div className="mode-toggle">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button" 
                className="toggle-button" 
                onClick={toggleMode}
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 