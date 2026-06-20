import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Sessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/sessions")
      .then((res) => setSessions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const totalEvents = sessions.reduce(
    (acc, s) => acc + (s.eventCount || 0),
    0
  );

  const avgEvents =
    sessions.length > 0
      ? Math.round(totalEvents / sessions.length)
      : 0;

  return (
    <div className="container">
      {/* Header */}
      <div className="navbar">
        <div>
          <h1 className="page-title">Analytics Dashboard</h1>
          <p className="subtitle">
            Monitor sessions, clicks and user journeys
          </p>
        </div>
      </div>

      {/* KPI Section */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <p className="kpi-title">Total Sessions</p>
          <p className="kpi-value">{sessions.length}</p>
        </div>

        <div className="kpi-card">
          <p className="kpi-title">Total Events</p>
          <p className="kpi-value">{totalEvents}</p>
        </div>

        <div className="kpi-card">
          <p className="kpi-title">Avg Events / Session</p>
          <p className="kpi-value">{avgEvents}</p>
        </div>
      </div>

      {/* Sessions */}
      {sessions.length === 0 ? (
        <div className="card">
          <p>No sessions found.</p>
        </div>
      ) : (
        <div className="sessions-grid">
          {sessions.map((session) => (
            <div className="session-card" key={session.session_id}>
              <div className="session-top">
                <span className="badge">SESSION</span>
                <span className="event-badge">
                  {session.eventCount} events
                </span>
              </div>

              <p className="session-id">
                {session.session_id}
              </p>

              <div className="session-footer">
                <Link
                  className="btn"
                  to={`/session/${session.session_id}`}
                >
                  View Journey →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="cta">
        <Link className="btn secondary" to="/heatmap">
          Open Heatmap →
        </Link>
      </div>
    </div>
  );
}

export default Sessions;