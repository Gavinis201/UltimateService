import React, { useState } from 'react';
import '../styles/ProfilePage.css';

// Mock user data
const mockUserData = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  role: 'Volunteer',
  joinDate: '2023-09-15',
  profile: '/images/profile-placeholder.jpg',
  bio: 'Passionate about community service and making a difference in people\'s lives. I enjoy participating in environmental and education-focused service projects.',
  stats: {
    eventsAttended: 12,
    volunteeredHours: 48,
    upcomingEvents: 3
  },
  interests: ['Environment', 'Education', 'Food Distribution'],
  badges: [
    { id: 1, name: 'First Timer', icon: '🌟', description: 'Completed first service event' },
    { id: 2, name: 'Green Thumb', icon: '🌱', description: 'Participated in 5 environmental events' },
    { id: 3, name: 'Helping Hand', icon: '🤝', description: 'Volunteered for over 25 hours' }
  ],
  recentActivity: [
    { id: 1, type: 'event', name: 'Beach Cleanup', date: '2024-05-28' },
    { id: 2, type: 'comment', name: 'Commented on Food Bank Volunteering', date: '2024-05-22' },
    { id: 3, type: 'signup', name: 'Signed up for Senior Center Visit', date: '2024-05-20' },
    { id: 4, type: 'event', name: 'Community Garden Planting', date: '2024-05-15' }
  ]
};

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(mockUserData);
  const [bioText, setBioText] = useState(mockUserData.bio);

  const handleSaveProfile = () => {
    setUserData({
      ...userData,
      bio: bioText
    });
    setEditMode(false);
  };

  return (
    <div className="profile-page">
      <div className="content">
        <div className="profile-header">
          <div className="profile-image">
            <div className="image-placeholder">
              <span>{userData.name.charAt(0)}</span>
            </div>
            <button className="edit-photo-button">Edit</button>
          </div>
          
          <div className="profile-info">
            <h1>{userData.name}</h1>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{userData.email}</span>
            </div>
            <div className="info-item">
              <span className="label">Role:</span>
              <span className="value">{userData.role}</span>
            </div>
            <div className="info-item">
              <span className="label">Member Since:</span>
              <span className="value">{new Date(userData.joinDate).toLocaleDateString()}</span>
            </div>
            
            <div className="profile-actions">
              <button 
                className="edit-profile-button"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Cancel' : 'Edit Profile'}
              </button>
              
              {editMode && (
                <button 
                  className="save-profile-button"
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="profile-bio">
          <h3>About Me</h3>
          {editMode ? (
            <textarea 
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              className="bio-textarea"
            />
          ) : (
            <p>{userData.bio}</p>
          )}
        </div>
        
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            Stats
          </button>
          <button 
            className={`tab-button ${activeTab === 'badges' ? 'active' : ''}`}
            onClick={() => setActiveTab('badges')}
          >
            Badges
          </button>
          <button 
            className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
          <button 
            className={`tab-button ${activeTab === 'interests' ? 'active' : ''}`}
            onClick={() => setActiveTab('interests')}
          >
            Interests
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'stats' && (
            <div className="stats-section">
              <div className="stat-card">
                <div className="stat-value">{userData.stats.eventsAttended}</div>
                <div className="stat-label">Events Attended</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{userData.stats.volunteeredHours}</div>
                <div className="stat-label">Volunteer Hours</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{userData.stats.upcomingEvents}</div>
                <div className="stat-label">Upcoming Events</div>
              </div>
            </div>
          )}
          
          {activeTab === 'badges' && (
            <div className="badges-section">
              {userData.badges.map(badge => (
                <div key={badge.id} className="badge-card">
                  <div className="badge-icon">{badge.icon}</div>
                  <div className="badge-info">
                    <h4>{badge.name}</h4>
                    <p>{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'activity' && (
            <div className="activity-section">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {userData.recentActivity.map(item => (
                  <div key={item.id} className="activity-item">
                    <div className="activity-icon">
                      {item.type === 'event' && '🗓️'}
                      {item.type === 'comment' && '💬'}
                      {item.type === 'signup' && '✅'}
                    </div>
                    <div className="activity-info">
                      <p>{item.name}</p>
                      <span className="activity-date">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'interests' && (
            <div className="interests-section">
              <h3>Interests</h3>
              {editMode ? (
                <div className="edit-interests">
                  {userData.interests.map((interest, index) => (
                    <div key={index} className="interest-edit-item">
                      <input type="text" value={interest} readOnly />
                      <button className="remove-interest">×</button>
                    </div>
                  ))}
                  <button className="add-interest-button">+ Add Interest</button>
                </div>
              ) : (
                <div className="interests-list">
                  {userData.interests.map((interest, index) => (
                    <div key={index} className="interest-tag">{interest}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 