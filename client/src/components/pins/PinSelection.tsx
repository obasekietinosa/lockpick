import '../../App.css';

interface PinSelectionProps {
  playerName: string;
  pinLength: number;
  pins: string[];
  inviteCode: string;
  onPinChange: (roundIndex: number, value: string) => void;
  onAutoGenerate: () => void;
  onContinue: () => void;
}

export function PinSelection({
  playerName,
  pinLength,
  pins,
  inviteCode,
  onPinChange,
  onAutoGenerate,
  onContinue,
}: PinSelectionProps) {
  return (
    <section className="config" aria-label="Secret pin selection">
      <div className="section-head">
        <div>
          <p className="eyebrow">Lock in your digits</p>
          <h2>Pick your secret pins for every round</h2>
        </div>
        <p className="section-lede">
          Choose the numbers your opponent will try to crack. Each round uses the same length you set in the configuration screen.
          You can hand-pick them or let us auto-generate a balanced mix.
        </p>
      </div>

      <div className="config-grid">
        <div className="config-card">
          <div className="field-head">
            <h3>Your rounds</h3>
            <button className="ghost" type="button" onClick={onAutoGenerate}>
              Randomize all pins
            </button>
          </div>
          <p className="field-help">Each pin must be {pinLength} digits long.</p>

          <div className="pin-selection-grid" aria-live="polite">
            {pins.map((pin, index) => (
              <div key={index} className="pin-row">
                <div className="pin-row-head">
                  <span className="chip">Round {index + 1}</span>
                  <span className="badge muted">Secret</span>
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={pinLength}
                  value={pin}
                  onChange={(event) => onPinChange(index, event.target.value)}
                  aria-label={`Secret pin for round ${index + 1}`}
                  placeholder={'•'.repeat(pinLength)}
                />
                <p className="field-help">Use digits 0-9 only. We will mask these before sharing your lobby.</p>
              </div>
            ))}
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-head">
            <div>
              <p className="eyebrow">Invite ready</p>
              <h3>Share with your rival</h3>
            </div>
            <span className="badge muted">Code</span>
          </div>
          <p className="section-lede">
            Keep this tab open while you and your opponent pick pins. Once both players are set, start the match to begin round one.
          </p>

          <div className="status-banner info" role="status">
            {inviteCode ? (
              <>
                Send code <strong>{inviteCode}</strong> to your rival and keep your pins secret.
              </>
            ) : (
              'Create a lobby from the config screen to generate an invite code.'
            )}
          </div>

          <div className="pin-preview-card" role="presentation">
            <div className="pin-preview-head">
              <div>
                <p className="eyebrow">Pinned for</p>
                <h3>{playerName || 'Player 1'}</h3>
              </div>
              <span className="chip muted">{pinLength} digits</span>
            </div>
            <ul className="pin-preview-list">
              {pins.map((pin, index) => (
                <li key={index}>
                  <span className="summary-label">Round {index + 1}</span>
                  <span className="summary-value">{pin ? '•'.repeat(pin.length) : 'Not set yet'}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cta-row">
            <button className="primary" type="button" onClick={onContinue}>
              Start round one
            </button>
            <button className="ghost" type="button" onClick={onAutoGenerate}>
              Fill with random pins
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
