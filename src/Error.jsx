import React from "react";
import "./index.css"; // optional css

export default function Error() {
  return (
    <div className="error-page">
      <h1>Sorry, this page has expired ❌</h1>
      <p>The page you’re trying to reach is unavailable or does not exist.</p>
      <a href="/login">Go back to Login Page</a>
    </div>
  );
}
