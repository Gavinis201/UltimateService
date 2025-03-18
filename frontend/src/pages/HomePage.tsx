import React, { useState } from 'react';
import '../styles/HomePage.css';

// Sample event dates for demonstration
const eventDates = [10, 15, 22, 26];

const HomePage: React.FC = () => {
  // Calendar functionality
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [filterType, setFilterType] = useState<string>('Month');

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

  // Select a date
  const handleDateSelect = (day: number) => {
    setSelectedDate(day);
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
      const dayHasEvent = hasEvent(day);
      
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${day === selectedDate ? 'selected' : ''} ${isToday ? 'today' : ''} ${dayHasEvent ? 'has-event' : ''}`}
          onClick={() => handleDateSelect(day)}
        >
          {day}
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
              placeholder="Event details..." 
              className="event-input"
            />
            <button className="add-button">+</button>
          </div>
        </section>

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

        <section className="post-comment-section">
          <h2>Post a Comment</h2>
          <div className="input-container">
            <input 
              type="text" 
              placeholder="Add a comment..." 
              className="comment-input"
            />
            <button className="add-button">+</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage; 