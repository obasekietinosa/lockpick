import { useMemo, useState } from 'react';
import { TimerValue } from '../constants';

function generatePin(length: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

function buildFeedback(guess: string, secret: string, hintsEnabled: boolean): string {
  const feedback = Array.from({ length: guess.length }, () => '⬜️');
  const secretDigits = secret.split('');
  const guessDigits = guess.split('');
  const remaining: Record<string, number> = {};

  guessDigits.forEach((digit, index) => {
    if (digit === secretDigits[index]) {
      feedback[index] = '🟩';
    } else {
      remaining[secretDigits[index]] = (remaining[secretDigits[index]] || 0) + 1;
    }
  });

  if (hintsEnabled) {
    guessDigits.forEach((digit, index) => {
      if (feedback[index] === '🟩') return;
      if (remaining[digit]) {
        feedback[index] = '🟧';
        remaining[digit] -= 1;
      }
    });
  }

  return feedback.join(' ');
}

export default function PlayPage() {
  const [pinLength, setPinLength] = useState(5);
  const [timer, setTimer] = useState<TimerValue>('30s');
  const [hintsEnabled, setHintsEnabled] = useState(true);
  const [secret, setSecret] = useState(() => generatePin(5));
  const [guess, setGuess] = useState('');
  const [history, setHistory] = useState<{ guess: string; feedback: string }[]>([]);
  const [status, setStatus] = useState('Awaiting your first guess.');

  const maskedSecret = useMemo(() => secret.replace(/\d/g, '•'), [secret]);

  const submitGuess = () => {
    const cleaned = guess.replace(/\D/g, '').slice(0, pinLength);

    if (cleaned.length !== pinLength) {
      setStatus(`Enter ${pinLength} digits before submitting.`);
      return;
    }

    const feedback = buildFeedback(cleaned, secret, hintsEnabled);
    setHistory((prev) => [{ guess: cleaned, feedback }, ...prev].slice(0, 6));
    setGuess('');

    if (cleaned === secret) {
      setStatus('Unlocked! Resetting with a fresh secret.');
      const nextPin = generatePin(pinLength);
      setSecret(nextPin);
    } else {
      setStatus('Keep iterating—use the hints to aim your next guess.');
    }
  };

  return (
    <div className="card">
      <div className="section-head">
        <h2 className="section-title">Prototype gameplay sandbox</h2>
        <p className="muted">
          A lightweight single-player loop to test hint feedback. Once sockets and timers are implemented this page can evolve
          into the realtime experience outlined in the README.
        </p>
      </div>

      <div className="form-grid" style={{ marginTop: '1rem' }}>
        <div className="form-field">
          <label htmlFor="pinLength">Pin length</label>
          <select
            id="pinLength"
            value={pinLength}
            onChange={(event) => {
              const next = Number(event.target.value);
              setPinLength(next);
              setSecret(generatePin(next));
              setHistory([]);
            }}
          >
            {[5, 7, 10].map((length) => (
              <option key={length} value={length}>
                {length} digits
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="timer">Timer</label>
          <select id="timer" value={timer} onChange={(event) => setTimer(event.target.value as TimerValue)}>
            <option value="none">No timer</option>
            <option value="30s">30 seconds</option>
            <option value="1m">1 minute</option>
            <option value="3m">3 minutes</option>
          </select>
          <p className="muted" style={{ margin: 0 }}>
            Timers are informational only for now. UI will hook into real timers in a later pass.
          </p>
        </div>

        <div className="form-field">
          <label htmlFor="hints">Hints</label>
          <div className="toggle-row">
            <input id="hints" type="checkbox" checked={hintsEnabled} onChange={(event) => setHintsEnabled(event.target.checked)} />
            <label htmlFor="hints">{hintsEnabled ? 'Enabled' : 'Disabled'}</label>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <p className="muted" style={{ marginTop: 0 }}>
          Secret for this sandbox: <strong>{maskedSecret}</strong>
        </p>
        <div className="hero-actions">
          <input
            className="pin-input"
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
            placeholder={`Enter ${pinLength} digits`}
            inputMode="numeric"
          />
          <button className="primary-button" type="button" onClick={submitGuess}>
            Submit guess
          </button>
          <button
            className="ghost-button"
            type="button"
            onClick={() => {
              setSecret(generatePin(pinLength));
              setHistory([]);
              setStatus('New secret set.');
            }}
          >
            New secret
          </button>
        </div>
        <p className="muted" style={{ margin: '0.75rem 0 0' }}>{status}</p>
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <h3 className="card-title">Recent guesses</h3>
        {history.length === 0 ? (
          <p className="muted">No guesses yet.</p>
        ) : (
          <ul className="rule-list" style={{ listStyle: 'none', paddingLeft: 0 }}>
            {history.map((entry, index) => (
              <li key={`${entry.guess}-${index}`} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span>{entry.guess}</span>
                <span>{entry.feedback}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
