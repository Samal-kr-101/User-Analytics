import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SessionJourney() {
  const { sessionId } = useParams();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  setLoading(true);
  setError("");

  axios
    .get(
      `${import.meta.env.VITE_API_URL}/api/sessions/${sessionId}`
    )
    .then((res) => {
      setEvents(res.data);
    })
    .catch(() => {
      setError("Failed to load session data");
    })
    .finally(() => setLoading(false));
}, [sessionId]);

  const getBadgeClass = (type) => {
    switch (type) {
      case "click":
        return "badge click";
      case "pageview":
        return "badge pageview";
      case "scroll":
        return "badge scroll";
      default:
        return "badge";
    }
  };

  return (
    <div className="session-container">
      <h1 className="title">User Journey</h1>

      <p className="subtitle">
        Session ID: <span>{sessionId}</span>
      </p>

      {loading && <p className="status">Loading events...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="timeline">
          {events.map((event, index) => (
            <div key={event._id} className="timeline-item">
              <div className="timeline-dot" />

              <div className="card">
                <div className="card-header">
                  <span className={getBadgeClass(event.event_type)}>
                    {event.event_type}
                  </span>
                  <span className="time">
                    {new Date(event.timestamp).toLocaleString()}
                  </span>
                </div>

                <p className="url">{event.page_url}</p>

                {event.x !== undefined && event.y !== undefined && (
                  <p className="coords">
                    X: {event.x}, Y: {event.y}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SessionJourney;