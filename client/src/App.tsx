import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Lockpick</h1>
        <p>Multiplayer number guessing with realtime play and whimsical design.</p>
      </header>
      <main className="app-main">
        <section className="card">
          <h2>Server + Client Bootstrapped</h2>
          <p>
            The project is ready for React + Vite on the frontend and Express + Socket.IO on the backend.
            Check the root README for the full game overview and planned user journeys.
          </p>
        </section>
        <section className="card">
          <h3>Next steps</h3>
          <ul>
            <li>Wire up game configuration, lobby, and gameplay flows.</li>
            <li>Connect to the websocket server for realtime multiplayer rounds.</li>
            <li>Style components with Tailwind to match the playful aesthetic.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
