import React, { useState } from 'react';
import '../styles/EventListPage.css';

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: 'Community Garden Cleanup',
    date: '2024-06-15',
    time: '9:00 AM - 12:00 PM',
    location: 'City Park',
    group: 'Environmental Team',
    attendees: 8,
    description: 'Help us clean up and maintain the community garden. Bring gloves and gardening tools if you have them.'
  },
  {
    id: 2,
    title: 'Food Bank Volunteering',
    date: '2024-06-18',
    time: '2:00 PM - 5:00 PM',
    location: 'City Food Bank',
    group: 'Food Distribution',
    attendees: 12,
    description: 'Assist in sorting donations and preparing food packages for distribution to families in need.'
  },
  {
    id: 3,
    title: 'Senior Center Visit',
    date: '2024-06-22',
    time: '1:00 PM - 3:00 PM',
    location: 'Sunshine Senior Center',
    group: 'Elder Care',
    attendees: 6,
    description: 'Spend time with seniors at the center, helping with activities and providing companionship.'
  },
  {
    id: 4,
    title: 'Beach Cleanup',
    date: '2024-06-26',
    time: '10:00 AM - 1:00 PM',
    location: 'City Beach',
    group: 'Environmental Team',
    attendees: 15,
    description: 'Join us for a beach cleanup to remove litter and debris from our local beach.'
  },
  {
    id: 5,
    title: 'Homeless Shelter Meal Service',
    date: '2024-06-30',
    time: '5:00 PM - 7:00 PM',
    location: 'Hope Shelter',
    group: 'Food Distribution',
    attendees: 10,
    description: 'Help prepare and serve meals to residents at the homeless shelter.'
  }
];

const EventListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Filter events based on search term and filter selection
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.group.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && event.group === filter;
  });

  // Get unique group names for filter dropdown
  const groups = Array.from(new Set(mockEvents.map(event => event.group)));

  return (
    <div className="event-list-page">
      <div className="content">
        <h1>Event List</h1>
        
        <div className="filter-section">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="all">All Groups</option>
            {groups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
        
        <div className="events-list">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <h3>{event.title}</h3>
                  <span className="event-date">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                
                <div className="event-details">
                  <div className="detail-row">
                    <span className="label">Time:</span>
                    <span className="value">{event.time}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Location:</span>
                    <span className="value">{event.location}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Group:</span>
                    <span className="value">{event.group}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Attending:</span>
                    <span className="value">{event.attendees} people</span>
                  </div>
                </div>
                
                <p className="event-description">{event.description}</p>
                
                <div className="event-actions">
                  <button className="sign-up-button">Sign Up</button>
                  <button className="details-button">Details</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-events">
              <p>No events found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventListPage; 