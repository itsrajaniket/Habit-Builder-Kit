import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  // 1. Initialize state by checking if a user is already saved in the browser
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem("currentUser"); // Returns the name or null
  });

  // 2. Handle Login: Save to State AND Browser Storage
  function handleLogin(username) {
    localStorage.setItem("currentUser", username);
    setCurrentUser(username);
  }

  // 3. Handle Logout: Clear from State AND Browser Storage
  function handleLogout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  }

  return (
    <>
      {currentUser ? (
        <Dashboard currentUser={currentUser} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
