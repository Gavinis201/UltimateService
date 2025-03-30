import React, { useState } from "react";
import "../App.css";

const AddEventPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [group, setGroup] = useState("Wakefield Ward"); // Default to Wakefield Ward
  const [description, setDescription] = useState("");
  const [attendees, setAttendees] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Format the event data to match the backend model expectations
      const formattedEvent = {
        title,
        // Format date properly for C# DateTime
        date: new Date(date).toISOString(),
        // Format time for C# TimeSpan (HH:MM:SS format)
        time: time + ":00",
        location,
        group,
        description,
        attendees,
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
      setTitle("");
      setDate("");
      setTime("");
      setLocation("");
      setGroup("Wakefield Ward"); // Keep default value
      setDescription("");
      setAttendees(0);
    } catch (err) {
      console.error('Error during submission:', err);
      setError(`Error adding event. Please try again. ${err instanceof Error ? err.message : ''}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-event-page">
      <div className="content">
        <h1 className="add-event-header">Add New Event</h1>
        <form onSubmit={handleSubmit} className="add-event-form">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Group"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <input
            type="number"
            placeholder="Number of Attendees"
            value={attendees}
            onChange={(e) => setAttendees(Number(e.target.value))}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Event"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default AddEventPage;
