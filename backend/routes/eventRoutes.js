const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Store Event
router.post("/events", async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      event,
    });
  } catch (err) {
    console.error("POST /events Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Sessions List
router.get("/sessions", async (req, res) => {
  try {
    const sessions = await Event.aggregate([
      {
        $group: {
          _id: "$session_id",
          eventCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          session_id: "$_id",
          eventCount: 1,
        },
      },
    ]);

    res.json(sessions);
  } catch (err) {
    console.error("GET /sessions Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Single Session Events
router.get("/sessions/:sessionId", async (req, res) => {
  try {
    const events = await Event.find({
      session_id: req.params.sessionId,
    }).sort({ timestamp: 1 });

    res.json(events);
  } catch (err) {
    console.error("GET /sessions/:sessionId Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Heatmap Data
router.get("/heatmap", async (req, res) => {
  try {
    const pageUrl = req.query.pageUrl;

    const clicks = await Event.find({
      page_url: pageUrl,
      event_type: "click",
    });

    res.json(clicks);
  } catch (err) {
    console.error("GET /heatmap Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Test MongoDB Connection
router.get("/test-db", async (req, res) => {
  try {
    const count = await Event.countDocuments();

    res.json({
      success: true,
      totalEvents: count,
    });
  } catch (err) {
    console.error("GET /test-db Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;