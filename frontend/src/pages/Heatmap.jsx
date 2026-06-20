import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Heatmap() {
  const [url, setUrl] = useState("");
  const [clicks, setClicks] = useState([]);

  const fetchHeatmap = async () => {
    try {
      const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/heatmap?pageUrl=${encodeURIComponent(url)}`
);

      setClicks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Click Heatmap</h1>

      <div className="card">
        <p
          style={{
            marginBottom: "15px",
            color: "#64748b",
          }}
        >
          Enter a page URL to visualize click activity.
        </p>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter page URL"
        />

        <button onClick={fetchHeatmap}>
          Load Heatmap
        </button>
      </div>

      <div className="card">
        <p>
          <strong>Total Clicks:</strong>{" "}
          {clicks.length}
        </p>
      </div>

      <div className="heatmap-box">
        {clicks.map((click, index) => (
          <div
            key={index}
            className="dot"
            style={{
              left: click.x,
              top: click.y,
            }}
            title={`(${click.x}, ${click.y})`}
          />
        ))}
      </div>

      <Link className="nav-link" to="/">
        ← Back to Dashboard
      </Link>
    </div>
  );
}

export default Heatmap;