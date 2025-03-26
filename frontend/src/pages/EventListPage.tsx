import React, { useState, useEffect } from 'react';
import '../styles/EventListPage.css';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  group: string;
  attendees: number;
  description: string;
}

const EventListPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/event');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (err) {
        setError('Error fetching events. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.group.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === 'all') return matchesSearch;
    return matchesSearch && event.group === filter;
  });

  const groups = Array.from(new Set(events.map(event => event.group)));

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

        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : filteredEvents.length > 0 ? (
          <div className="events-list">
            {filteredEvents.map(event => (
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
            ))}
          </div>
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventListPage;