import React from 'react';
import '../styles/GroupInfoPage.css';

const GroupInfoPage: React.FC = () => {
  return (
    <div className="group-info-page">
      <div className="content">
        <h1>Group Info</h1>
        
        <section className="group-details">
          <div className="group-header">
            <div className="group-logo">
              <img src="/logo.svg" alt="Group Logo" />
            </div>
            <h2>Community Service Group</h2>
          </div>
          
          <div className="group-description">
            <h3>About Us</h3>
            <p>
              We are a community-focused service group dedicated to making a positive impact through 
              volunteer work and community engagement. Our members come together to support local 
              initiatives and provide assistance to those in need.
            </p>
          </div>
          
          <div className="mission-statement">
            <h3>Our Mission</h3>
            <p>
              To build stronger communities through service, compassion, and cooperation. We believe 
              that by working together, we can make a meaningful difference in the lives of others.
            </p>
          </div>
        </section>
        
        <section className="membership-info">
          <h3>Membership Information</h3>
          <div className="membership-details">
            <div className="detail-item">
              <span className="label">Founded:</span>
              <span className="value">2023</span>
            </div>
            <div className="detail-item">
              <span className="label">Members:</span>
              <span className="value">42</span>
            </div>
            <div className="detail-item">
              <span className="label">Service Hours:</span>
              <span className="value">1,250+</span>
            </div>
            <div className="detail-item">
              <span className="label">Projects Completed:</span>
              <span className="value">35</span>
            </div>
          </div>
        </section>
        
        <section className="contact-info">
          <h3>Contact Information</h3>
          <div className="contact-details">
            <div className="detail-item">
              <span className="label">Email:</span>
              <span className="value">contact@communityservice.org</span>
            </div>
            <div className="detail-item">
              <span className="label">Phone:</span>
              <span className="value">(555) 123-4567</span>
            </div>
            <div className="detail-item">
              <span className="label">Meeting Schedule:</span>
              <span className="value">Every Tuesday at 7:00 PM</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GroupInfoPage; 