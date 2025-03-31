import React from 'react';
import '../styles/GroupInfoPage.css';
import logoImage from '../assets/Untitled design.png';

const GroupInfoPage: React.FC = () => {
  return (
    <div className="group-info-page">
      <div className="content">
        <h1>Group Info</h1>
        
        <section className="group-details">
          <div className="group-header">
            <div className="group-logo">
              <img src={logoImage} alt="Ward Logo" />
            </div>
            <h2>Wakefield Ward</h2>
          </div>
          
          <div className="group-description">
            <h3>About Us</h3>
            <p>
              The Wakefield Ward is a local congregation of The Church of Jesus Christ of Latter-day Saints.
              Our ward is dedicated to serving one another and our community through Christ-centered service,
              fellowship, and spiritual growth. We welcome all who wish to worship with us.
            </p>
          </div>
          
          <div className="mission-statement">
            <h3>Our Purpose</h3>
            <p>
              To help individuals and families come unto Christ by living the gospel of Jesus Christ,
              serving others, and building a supportive community of faith where everyone feels welcome and valued.
            </p>
          </div>
        </section>
        
        <section className="membership-info">
          <h3>Membership Information</h3>
          <div className="membership-details">
            <div className="detail-item">
              <span className="label">Established:</span>
              <span className="value">2015</span>
            </div>
            <div className="detail-item">
              <span className="label">Members:</span>
              <span className="value">160</span>
            </div>
            <div className="detail-item">
              <span className="label">Service Projects:</span>
              <span className="value">24+ annually</span>
            </div>
            <div className="detail-item">
              <span className="label">Active Organizations:</span>
              <span className="value">Relief Society, Elder's Quorum, Primary, Young Men/Women</span>
            </div>
          </div>
        </section>
        
        <section className="contact-info">
          <h3>Contact Information</h3>
          <div className="contact-details">
            <div className="detail-item">
              <span className="label">Email:</span>
              <span className="value">wakefieldward@churchofjesuschrist.org</span>
            </div>
            <div className="detail-item">
              <span className="label">Bishop:</span>
              <span className="value">Bishop Thomas Anderson</span>
            </div>
            <div className="detail-item">
              <span className="label">Meeting Schedule:</span>
              <span className="value">Sundays at 10:00 AM</span>
            </div>
            <div className="detail-item">
              <span className="label">Address:</span>
              <span className="value">123 Wakefield Street, Wakefield, MA 01880</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GroupInfoPage; 