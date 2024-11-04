import React from 'react';

const App: React.FC = () => {
  return (
    <div>
      <header>
        <h1>HAKY Manager</h1>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/profile">Profile</a>
          <a href="/settings">Settings</a>
        </nav>
      </header>
      <main>
        <p>Welcome to the HAKY Manager App!</p>
      </main>
    </div>
  );
};

export default App;
