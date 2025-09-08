import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "./Error";
import Inventory from "./Inventory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inventory />} />
        {/* <Route path="/secret" element={<Inventory />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
