import { useEffect, useState } from 'react';
import { pinLengthOptions } from '../constants';

function generatePin(length: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

export default function PinSetupPage() {
  const [pinLength, setPinLength] = useState(5);
  const [pins, setPins] = useState<string[]>(() => Array(3).fill(''));
  const [note, setNote] = useState('');

  useEffect(() => {
    setPins(Array(3).fill(''));
  }, [pinLength]);

  const handleChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, pinLength);
    setPins((prev) => prev.map((pin, idx) => (idx === index ? cleaned : pin)));
  };

  const fillPins = () => {
    setPins(Array.from({ length: 3 }, () => generatePin(pinLength)));
    setNote('Pins generated locally. Wire them to the lobby when sockets go live.');
  };

  return (
    <div className="card">
      <div className="section-head">
        <h2 className="section-title">Set pins for all three rounds</h2>
        <p className="muted">
          Each round uses the same pin length, matching the rules on the configuration page. Players can type their own digits
          or auto-generate them.
        </p>
      </div>

      <div className="form-grid" style={{ marginTop: '1rem' }}>
        <div className="form-field">
          <label htmlFor="pinLength">Pin length</label>
          <select id="pinLength" value={pinLength} onChange={(event) => setPinLength(Number(event.target.value))}>
            {pinLengthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label>Quick actions</label>
          <div className="hero-actions">
            <button className="secondary-button" type="button" onClick={fillPins}>
              Generate all pins
            </button>
            <button className="ghost-button" type="button" onClick={() => setPins(Array(3).fill(''))}>
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="pin-grid" style={{ marginTop: '1rem' }}>
        {pins.map((pin, index) => (
          <div key={index} className="pin-card">
            <div className="small-pill">Round {index + 1}</div>
            <input
              className="pin-input"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={'•'.repeat(pinLength)}
              value={pin}
              onChange={(event) => handleChange(index, event.target.value)}
            />
            <p className="muted" style={{ margin: 0 }}>
              {pin ? `${pin.length}/${pinLength} digits set` : 'Waiting for digits'}
            </p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '1.25rem' }}>
        <div className="status-chip" aria-live="polite">
          <span role="img" aria-label="lock">🔐</span>
          {note || 'Pins live only in the UI for now—backend wiring comes next.'}
        </div>
      </div>
    </div>
  );
}
