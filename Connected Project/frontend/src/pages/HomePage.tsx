import React, { useEffect, useState } from 'react';
import '../styles/HomePage.css';
import { useNavigate } from 'react-router-dom';


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

// Sample event dates for demonstration
const eventDates = [10, 15, 22, 26];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [filterType, setFilterType] = useState<string>('Month');
  const [eventTitle, setEventTitle] = useState<string>('');
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [showDateEventsModal, setShowDateEventsModal] = useState<boolean>(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    group: 'Wakefield Ward',
    description: '',
    attendees: 0
  });

    // Fetch all events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/event");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  const hasEvents = (day: number) => {
    const dateStr = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    ).toISOString().split('T')[0];
    
    return events.some(event => 
      new Date(event.date).toISOString().split('T')[0] === dateStr
    );
  };

  // Get events for a specific date
  const getEventsForDate = (day: number) => {
    const dateStr = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    ).toISOString().split('T')[0];
    
    return events.filter(event => 
      new Date(event.date).toISOString().split('T')[0] === dateStr
    );
  };

  const handleDateSelect = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    setSelectedDate(date);
    
    const dateEvents = getEventsForDate(day);
    if (dateEvents.length > 0) {
      setShowDateEventsModal(true);
    }
  };

  // Handle event form input changes
  const handleEventFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventForm(prev => ({
      ...prev,
      [name]: name === 'attendees' ? parseInt(value) || 0 : value
    }));
  };

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setFilterType(filter);
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };


  // Open event modal
  const openEventModal = () => {
    // Pre-fill the title from the input and use Wakefield Ward as the group
    setEventForm(prev => ({
      ...prev,
      title: eventTitle,
      group: 'Wakefield Ward'
    }));
    setShowEventModal(true);
  };

  // Close event modal
  const closeEventModal = () => {
    setShowEventModal(false);
  };

  // Submit event form
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Format the event data to match the backend model expectations
      const formattedEvent = {
        title: eventForm.title,
        // Format date properly for C# DateTime
        date: new Date(eventForm.date).toISOString(),
        // Format time for C# TimeSpan (HH:MM:SS format)
        time: eventForm.time + ":00",
        location: eventForm.location,
        group: eventForm.group,
        description: eventForm.description,
        attendees: eventForm.attendees
      };

      console.log('Submitting event:', formattedEvent);

      const response = await fetch("http://localhost:5000/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedEvent),
      });

      const responseData = await response.text();
      console.log('Response:', response.status, responseData);

      if (!response.ok) {
        throw new Error(`Failed to add event: ${response.status} ${responseData}`);
      }

      alert("Event added successfully!");
      setEventTitle('');
      setEventForm({
        title: '',
        date: '',
        time: '',
        location: '',
        group: 'Wakefield Ward',
        description: '',
        attendees: 0
      });
      setShowEventModal(false);
      
      // Optionally redirect to see the events
      // navigate('/event-list');
    } catch (err) {
      console.error('Error during submission:', err);
      alert(`Error adding event. Please try again. ${err instanceof Error ? err.message : ''}`);
    }
  };

  // Get today's date
  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentMonth.getMonth() && 
                          today.getFullYear() === currentMonth.getFullYear();
  const todayDate = today.getDate();

  // Check if a date has an event
  const hasEvent = (day: number) => {
    return eventDates.includes(day);
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let day = 1; day <= totalDays; day++) {
      const isToday = isCurrentMonth && day === todayDate;
      const dayHasEvents = hasEvents(day);
      
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${day === selectedDate?.getDate() ? 'selected' : ''} ${isToday ? 'today' : ''} ${dayHasEvents ? 'has-event' : ''}`}
          onClick={() => handleDateSelect(day)}
        >
          {day}
          {dayHasEvents && <span className="event-dot"></span>}
        </div>
      );
    }
    return days;
  };

  // Format month and year for display
  const formatMonthYear = () => {
    return currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="home-page">
      <div className="content">
        <section className="post-event-section">
          <h2>Post an Event</h2>
          <div className="input-container">
            <input 
              type="text" 
              placeholder="Event Title" 
              className="event-input"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <button className="add-button" onClick={openEventModal}>+</button>
          </div>
        </section>

        {/* Event Form Modal */}
        {showEventModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Add New Event</h2>
              <form onSubmit={handleEventSubmit} className="event-form">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={eventForm.title}
                    onChange={handleEventFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={eventForm.date}
                    onChange={handleEventFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    name="time"
                    value={eventForm.time}
                    onChange={handleEventFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={eventForm.location}
                    onChange={handleEventFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Group</label>
                  <input
                    type="text"
                    name="group"
                    value={eventForm.group}
                    onChange={handleEventFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={eventForm.description}
                    onChange={handleEventFormChange}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Number of Attendees</label>
                  <input
                    type="number"
                    name="attendees"
                    value={eventForm.attendees}
                    onChange={handleEventFormChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="button" onClick={closeEventModal} className="cancel-btn">Cancel</button>
                  <button type="submit" className="submit-btn">Add Event</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <section className="upcoming-events-section">
          <div className="header-with-filter">
            <h2>Upcoming Events</h2>
            <button className="filter-button">Filter</button>
          </div>

          <div className="filter-options">
            <button 
              className={`filter-option ${filterType === 'Month' ? 'active' : ''}`}
              onClick={() => handleFilterChange('Month')}
            >
              Month
            </button>
            <button 
              className={`filter-option ${filterType === 'Year' ? 'active' : ''}`}
              onClick={() => handleFilterChange('Year')}
            >
              Year
            </button>
            <button 
              className={`filter-option ${filterType === 'Day' ? 'active' : ''}`}
              onClick={() => handleFilterChange('Day')}
            >
              Day
            </button>
            <button 
              className={`filter-option ${filterType === 'By Group' ? 'active' : ''}`}
              onClick={() => handleFilterChange('By Group')}
            >
              By Group
            </button>
            <button 
              className={`filter-option ${filterType === 'By Size' ? 'active' : ''}`}
              onClick={() => handleFilterChange('By Size')}
            >
              By Size
            </button>
          </div>

          <div className="calendar">
            <div className="calendar-header">
              <div className="month-navigation">
                <span>{formatMonthYear()}</span>
                <div className="nav-buttons">
                  <button onClick={prevMonth}>&lt;</button>
                  <button onClick={nextMonth}>&gt;</button>
                </div>
              </div>
            </div>
            
            <div className="weekdays">
              <div>SUN</div>
              <div>MON</div>
              <div>TUE</div>
              <div>WED</div>
              <div>THU</div>
              <div>FRI</div>
              <div>SAT</div>
            </div>
            
            <div className="calendar-grid">
              {renderCalendarDays()}
            </div>
          </div>
        </section>

      </div>
  {/* Date Events Modal */}
  {showDateEventsModal && selectedDate && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Events on {selectedDate.toLocaleDateString()}</h2>
            <button 
              className="close-button" 
              onClick={() => setShowDateEventsModal(false)}
            >
              ×
            </button>
            
            <div className="date-events-list">
              {getEventsForDate(selectedDate.getDate()).length > 0 ? (
                getEventsForDate(selectedDate.getDate()).map(event => (
                  <div key={event.id} className="event-item">
                    <h3>{event.title}</h3>
                    <p>Time: {event.time}</p>
                    <p>Location: {event.location}</p>
                    <p>Group: {event.group}</p>
                    <button 
                      onClick={() => navigate(`/event-details/${event.id}`)}
                      className="details-button"
                    >
                      Back
                    </button>
                  </div>
                ))
              ) : (
                <p>No events for this date</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;