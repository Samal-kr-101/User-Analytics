(function () {
  let sessionId = localStorage.getItem("session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("session_id", sessionId);
  }

  function sendEvent(eventData) {
    fetch("https://user-analytics-da3k.onrender.com/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    }).catch((err) => console.log(err));
  }

  // Page View
  sendEvent({
    session_id: sessionId,
    event_type: "page_view",
    page_url: window.location.href,
    timestamp: new Date(),
  });

  // Click Event
  document.addEventListener("click", (e) => {
    sendEvent({
      session_id: sessionId,
      event_type: "click",
      page_url: window.location.href,
      timestamp: new Date(),
      x: e.clientX,
      y: e.clientY,
    });
  });
})();