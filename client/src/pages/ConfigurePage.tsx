import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { pinLengthOptions, timerOptions } from '../constants';

export default function ConfigurePage() {
  const [playerName, setPlayerName] = useState('Player 1');
  const [pinLength, setPinLength] = useState(5);
  const [timer, setTimer] = useState('30s');
  const [hintsEnabled, setHintsEnabled] = useState(true);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('Ready to spin up a lobby.');

  const summary = useMemo(
    () =>
      `${playerName || 'Unnamed'} • ${pinLength}-digit pins • ${hintsEnabled ? 'Hints on' : 'Hints off'} • Timer ${timer}`,
    [hintsEnabled, pinLength, playerName, timer],
  );

  return (
    <div className="card">
      <div className="section-head">
        <h2 className="section-title">Configure a new match</h2>
        <p className="muted">
          Mirror the setup described in the README: pick a pin length, decide whether hints are enabled, and choose the timer.
          Everything here is client-side for now to keep the reset lightweight.
        </p>
      </div>

      <div className="form-grid" style={{ marginTop: '1rem' }}>
        <div className="form-field">
          <label htmlFor="playerName">Player name</label>
          <input
            id="playerName"
            type="text"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            placeholder="Agent Lumen"
          />
        </div>

        <div className="form-field">
          <label htmlFor="pinLength">Pin length</label>
          <select id="pinLength" value={pinLength} onChange={(event) => setPinLength(Number(event.target.value))}>
            {pinLengthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="muted" style={{ margin: 0 }}>{pinLengthOptions.find((option) => option.value === pinLength)?.detail}</p>
        </div>

        <div className="form-field">
          <label htmlFor="timer">Timer</label>
          <select id="timer" value={timer} onChange={(event) => setTimer(event.target.value)}>
            {timerOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="muted" style={{ margin: 0 }}>{timerOptions.find((option) => option.value === timer)?.detail}</p>
        </div>

        <div className="form-field">
          <label>Hints</label>
          <div className="toggle-row">
            <input
              id="hints"
              type="checkbox"
              checked={hintsEnabled}
              onChange={(event) => setHintsEnabled(event.target.checked)}
            />
            <label htmlFor="hints">{hintsEnabled ? 'Enabled' : 'Disabled'} — shows 🟧 for misplaced digits.</label>
          </div>
        </div>
      </div>

      <div className="form-field" style={{ marginTop: '0.75rem' }}>
        <label htmlFor="notes">Notes for your rival</label>
        <textarea
          id="notes"
          rows={3}
          placeholder="Optional: remind your opponent what rules you picked."
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </div>

      <div className="hero-actions" style={{ marginTop: '1rem' }}>
        <button
          className="primary-button"
          type="button"
          onClick={() => setStatus('Config saved locally. Hook this up to the API when the backend is ready.')}
        >
          Save locally
        </button>
        <Link to="/join" className="ghost-button">
          Continue to join flow
        </Link>
      </div>

      <div className="card" style={{ marginTop: '1.25rem' }}>
        <div className="status-chip" aria-live="polite">
          <span role="img" aria-label="sparkles">
            ✨
          </span>
          {status}
        </div>
        <p className="muted" style={{ margin: '0.5rem 0 0' }}>
          {summary}
          {notes ? ` • ${notes}` : ''}
        </p>
      </div>
    </div>
  );
}
