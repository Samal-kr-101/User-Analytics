const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Store Event
router.post("/events", async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      event
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Sessions List
router.get("/sessions", async (req, res) => {

  const sessions = await Event.aggregate([
    {
      $group: {
        _id: "$session_id",
        eventCount: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        session_id: "$_id",
        eventCount: 1
      }
    }
  ]);

  res.json(sessions);
});

// Single Session Events
router.get("/sessions/:sessionId", async (req, res) => {

  const events = await Event.find({
    session_id: req.params.sessionId
  }).sort({ timestamp: 1 });

  res.json(events);
});

// Heatmap Data
router.get("/heatmap", async (req, res) => {

  const pageUrl = req.query.pageUrl;

  const clicks = await Event.find({
    page_url: pageUrl,
    event_type: "click"
  });

  res.json(clicks);
});

module.exports = router;