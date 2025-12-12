import '../../App.css';

interface SummaryPreviewProps {
  playerName: string;
  pinLength: number;
  hintsEnabled: boolean;
  timerLabel?: string;
  onStartGame: () => void;
  onJoinGame: () => void;
}

export function SummaryPreview({ playerName, pinLength, hintsEnabled, timerLabel, onStartGame, onJoinGame }: SummaryPreviewProps) {
  return (
    <div className="summary-card" aria-label="Configuration summary">
      <div className="summary-head">
        <div>
          <p className="eyebrow">Live preview</p>
          <h3>Your rules at a glance</h3>
        </div>
        <span className="badge muted">Shareable</span>
      </div>
      <ul className="summary-list">
        <li>
          <span className="summary-label">Player</span>
          <span className="summary-value">{playerName || 'Player 1'}</span>
        </li>
        <li>
          <span className="summary-label">Pin length</span>
          <span className="summary-value">{pinLength} digits</span>
        </li>
        <li>
          <span className="summary-label">Hints</span>
          <span className="summary-value">{hintsEnabled ? 'Enabled' : 'Disabled'}</span>
        </li>
        <li>
          <span className="summary-label">Timer</span>
          <span className="summary-value">{timerLabel}</span>
        </li>
      </ul>

      <div className="preview-card" role="presentation">
        <div className="preview-row">
          <span className="chip">Round 1 of 3</span>
          <span className="chip muted">{timerLabel}</span>
        </div>
        <p className="preview-name">{playerName || 'Player 1'}</p>
        <div className="preview-pin" aria-hidden>
          {Array.from({ length: pinLength }).map((_, index) => (
            <span key={index} className="pin-slot">
              ?
            </span>
          ))}
        </div>
        <div className="preview-hints">
          <span className={`dot ${hintsEnabled ? 'correct' : 'muted-dot'}`} />
          <span>Green = correct spot</span>
          {hintsEnabled && <span className="dot misplaced" />}
          {hintsEnabled && <span>Orange = right digit, wrong spot</span>}
        </div>
      </div>

      <div className="cta-row">
        <button className="primary" type="button" onClick={onStartGame}>
          Create lobby
        </button>
        <button className="ghost" type="button" onClick={onJoinGame}>
          I already have a code
        </button>
      </div>
    </div>
  );
}
