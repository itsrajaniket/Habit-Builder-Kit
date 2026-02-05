import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  // Store the actual username, not just "true"
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      {currentUser ? (
        <Dashboard
          currentUser={currentUser}
          onLogout={() => setCurrentUser(null)}
        />
      ) : (
        // Login now passes the username back to App
        <Login onLogin={(username) => setCurrentUser(username)} />
      )}
    </>
  );
}

export default App;
