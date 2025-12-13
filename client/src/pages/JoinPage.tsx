import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function JoinPage() {
  const [name, setName] = useState('Player 2');
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState('Enter an invite code to simulate the join flow.');

  const handleJoin = () => {
    if (!code.trim()) {
      setFeedback('Add a lobby code before joining.');
      return;
    }

    setFeedback(`Pretending to join lobby ${code} as ${name || 'Unnamed'} — wire to the API next.`);
  };

  return (
    <div className="card">
      <div className="section-head">
        <h2 className="section-title">Join an existing lobby</h2>
        <p className="muted">Share codes between friends or match with a stranger when we add queueing.</p>
      </div>

      <div className="form-grid" style={{ marginTop: '1rem' }}>
        <div className="form-field">
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Player name"
          />
        </div>

        <div className="form-field">
          <label htmlFor="code">Lobby code</label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value.trim())}
            placeholder="Paste invite"
          />
        </div>
      </div>

      <div className="hero-actions" style={{ marginTop: '1rem' }}>
        <button className="primary-button" type="button" onClick={handleJoin}>
          Join lobby
        </button>
        <Link className="ghost-button" to="/configure">
          Back to configuration
        </Link>
      </div>

      <div className="card" style={{ marginTop: '1.25rem' }}>
        <div className="status-chip" aria-live="polite">
          <span role="img" aria-label="door">🚪</span>
          {feedback}
        </div>
      </div>
    </div>
  );
}
