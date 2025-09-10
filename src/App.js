import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "./Error";
import Inventory from "./Inventory";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/secret" element={<Error />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Inventory />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
