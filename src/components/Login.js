import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setError("");
    onLogin(username.trim());
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">Budget Tracker Login</h1>
        <p className="login-subtitle">Sign in to access your budget dashboard.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className="login-input"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter username"
          />

          <label className="login-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="login-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
          />

          {error && <div className="login-error">{error}</div>}

          <button className="login-button" type="submit">
            Login
          </button>
        </form>

        <p className="login-note">Use any username and password to continue.</p>
      </div>
    </div>
  );
}

export default Login;
