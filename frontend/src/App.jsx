import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sessions from "./pages/Sessions";
import SessionJourney from "./pages/SessionJourney";
import Heatmap from "./pages/Heatmap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sessions />} />
        <Route
          path="/session/:sessionId"
          element={<SessionJourney />}
        />
        <Route path="/heatmap" element={<Heatmap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;