import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "./Error";
import Inventory from "./Inventory";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/secret" element={<Inventory />} />
      </Routes>
    </Router>
  );
}

export default App;
