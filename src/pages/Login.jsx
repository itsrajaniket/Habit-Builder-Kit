import { useState } from "react";

const USERS = {
  user1: "1234",
  user2: "1234",
  user3: "1234",
  user4: "1234",
  user5: "1234",
};

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (USERS[username] === password) {
      setError("");
      onLogin(username); // <--- PASS THE USERNAME HERE
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🎯 Habit Tracker Pro</h1>
        <p className="login-subtitle">Track your habits, build your future</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>

        <p className="login-hint">
          <strong>Test Users:</strong>
          <br />
          user1 / 1234
          <br />
          user2 / 1234
          <br />
          user3 / 1234
          <br />
          user4 / 1234
          <br />
          user5 / 1234
        </p>

        {error && <div className="login-error">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
