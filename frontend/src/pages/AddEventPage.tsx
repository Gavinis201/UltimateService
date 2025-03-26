import React, { useState } from "react";
import "../App.css";

const AddEventPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [group, setGroup] = useState("");
  const [description, setDescription] = useState("");
  const [attendees, setAttendees] = useState(0); // New field for attendees
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const newEvent = {
      title,
      date,
      time,
      location,
      group,
      description,
      attendees,
    };

    try {
      const response = await fetch("http://localhost:5000/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add event");
      }

      alert("Event added successfully!");
      setTitle("");
      setDate("");
      setTime("");
      setLocation("");
      setGroup("");
      setDescription("");
      setAttendees(0); // Reset attendees
    } catch (err: any) {
      setError(`Error adding event: ${err.message || "Please try again."}`);
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
