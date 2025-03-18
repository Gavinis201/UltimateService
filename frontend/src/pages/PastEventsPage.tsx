import React, { useState } from 'react';
import '../styles/PastEventsPage.css';

// Mock data for past events
const mockPastEvents = [
  {
    id: 101,
    title: 'Park Renovation Project',
    date: '2024-05-28',
    time: '10:00 AM - 4:00 PM',
    location: 'Central City Park',
    group: 'Environmental Team',
    participants: 23,
    impact: 'Renovated 3 park benches, planted 15 trees, and cleaned trash from 2 acres of parkland.',
    images: ['/images/park1.jpg', '/images/park2.jpg']
  },
  {
    id: 102,
    title: 'Elementary School Reading Day',
    date: '2024-05-20',
    time: '1:00 PM - 3:00 PM',
    location: 'Lincoln Elementary School',
    group: 'Education Support',
    participants: 12,
    impact: 'Read to 5 classrooms of students, donated 50 books to the school library.',
    images: ['/images/reading1.jpg']
  },
  {
    id: 103,
    title: 'Homeless Shelter Meal Service',
    date: '2024-05-15',
    time: '5:00 PM - 7:30 PM',
    location: 'Hope Shelter',
    group: 'Food Distribution',
    participants: 9,
    impact: 'Prepared and served meals to 75 individuals, organized donated clothing.',
    images: ['/images/shelter1.jpg', '/images/shelter2.jpg']
  },
  {
    id: 104,
    title: 'Senior Center Technology Workshop',
    date: '2024-05-10',
    time: '10:00 AM - 12:00 PM',
    location: 'Sunshine Senior Center',
    group: 'Elder Care',
    participants: 7,
    impact: 'Assisted 18 seniors with smartphone and computer skills, set up email accounts for 5 residents.',
    images: ['/images/tech1.jpg']
  },
  {
    id: 105,
    title: 'Community Garden Planting',
    date: '2024-05-05',
    time: '9:00 AM - 1:00 PM',
    location: 'Westside Community Garden',
    group: 'Environmental Team',
    participants: 20,
    impact: 'Planted vegetables in 15 garden beds, repaired irrigation system, built 3 new compost bins.',
    images: ['/images/garden1.jpg', '/images/garden2.jpg']
  }
];

const PastEventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  // Filter events based on search term and filter selection
  const filteredEvents = mockPastEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.group.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && event.group === filter;
  });

  // Get unique group names for filter dropdown
  const groups = Array.from(new Set(mockPastEvents.map(event => event.group)));

  // Toggle event details expansion
  const toggleEventDetails = (eventId: number) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(eventId);
    }
  };

  return (
    <div className="past-events-page">
      <div className="content">
        <h1>Past Events</h1>
        
        <div className="filter-section">
          <input
            type="text"
            placeholder="Search past events..."
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
        
        <div className="past-events-list">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <div key={event.id} className="past-event-card">
                <div className="event-header">
                  <h3>{event.title}</h3>
                  <span className="event-date">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                
                <div className="event-summary">
                  <div className="detail-row">
                    <span className="label">Group:</span>
                    <span className="value">{event.group}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Participants:</span>
                    <span className="value">{event.participants} volunteers</span>
                  </div>
                </div>
                
                <button 
                  className="toggle-details-button"
                  onClick={() => toggleEventDetails(event.id)}
                >
                  {expandedEvent === event.id ? 'Hide Details' : 'Show Details'}
                </button>
                
                {expandedEvent === event.id && (
                  <div className="expanded-details">
                    <div className="detail-row">
                      <span className="label">Time:</span>
                      <span className="value">{event.time}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Location:</span>
                      <span className="value">{event.location}</span>
                    </div>
                    
                    <div className="impact-section">
                      <h4>Impact</h4>
                      <p>{event.impact}</p>
                    </div>
                    
                    <div className="event-photos">
                      <h4>Photos</h4>
                      <div className="photo-grid">
                        {event.images.map((img, index) => (
                          <div key={index} className="photo-placeholder">
                            Photo {index + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="comments-section">
                      <h4>Comments</h4>
                      <div className="comments-list">
                        <p className="no-comments">No comments yet. Be the first to comment!</p>
                      </div>
                      <div className="add-comment">
                        <input type="text" placeholder="Add a comment..." />
                        <button>Post</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-events">
              <p>No past events found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastEventsPage; 