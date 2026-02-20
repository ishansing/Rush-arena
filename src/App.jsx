import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <Dashboard onLogout={() => setIsLoggedIn(false)} />
      )}
    </div>
  );
}

export default App;
