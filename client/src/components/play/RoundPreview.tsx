import '../../App.css';

interface GuessEntry {
  round: number;
  guess: string;
  feedback: string;
}

interface RoundPreviewProps {
  playerName: string;
  pins: string[];
  pinLength: number;
  activeRound: number;
  guessDigits: string[];
  guessHistory: GuessEntry[];
  statusMessage: string | null;
  statusTone: 'success' | 'error' | 'info';
  onDigitChange: (index: number, value: string) => void;
  onSubmitGuess: () => void;
  onAdvanceRound: () => void;
}

export function RoundPreview({
  playerName,
  pins,
  pinLength,
  activeRound,
  guessDigits,
  guessHistory,
  statusMessage,
  statusTone,
  onDigitChange,
  onSubmitGuess,
  onAdvanceRound,
}: RoundPreviewProps) {
  const maskedPins = pins.map((pin) => (pin ? '•'.repeat(pin.length) : 'Not set'));

  return (
    <section className="config" aria-label="Gameplay preview">
      <div className="section-head">
        <div>
          <p className="eyebrow">Round {activeRound} of 3</p>
          <h2>Start guessing and track your rival</h2>
        </div>
        <p className="section-lede">
          Watch the timer, enter your guesses, and read the feedback to narrow down the secret code. This view mirrors what the
          final gameplay screen will offer.
        </p>
      </div>

      <div className="play-grid">
        <div className="config-card">
          <div className="play-head">
            <div>
              <p className="eyebrow">Scoreboard</p>
              <h3>{playerName || 'Player 1'} vs Rival</h3>
            </div>
            <span className="chip">{pinLength} digits</span>
          </div>

          <div className="score status-card">
            <div>
              <p className="label">You</p>
              <p className="score-value">2 🔒</p>
            </div>
            <div>
              <p className="label">Rival</p>
              <p className="score-value">1 🔒</p>
            </div>
          </div>

          <div className="timer-card">
            <div>
              <p className="eyebrow">Timer</p>
              <h3>01:15</h3>
            </div>
            <p className="section-lede">Keep your guesses quick. Rounds end when the timer hits zero or someone cracks the code.</p>
            <button className="ghost" type="button" onClick={onAdvanceRound}>
              Skip to next round
            </button>
          </div>

          <div className="hint-row">
            <div className="hint">
              <span className="dot correct" /> Green = correct spot
            </div>
            <div className="hint">
              <span className="dot misplaced" /> Orange = right digit, wrong spot
            </div>
          </div>

          {statusMessage && (
            <div className={`status-banner ${statusTone}`} role="status">
              {statusMessage}
            </div>
          )}

          <div className="guess-inputs" role="form" aria-label="Enter your guess">
            {guessDigits.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                className="pin-slot interactive"
                value={digit}
                onChange={(event) => onDigitChange(index, event.target.value)}
                aria-label={`Digit ${index + 1} for guess`}
              />
            ))}
          </div>

          <button className="primary full" type="button" onClick={onSubmitGuess}>
            Submit guess
          </button>
        </div>

        <div className="summary-card">
          <div className="summary-head">
            <div>
              <p className="eyebrow">Your secret pins</p>
              <h3>What your rival is solving</h3>
            </div>
            <span className="badge muted">Hidden</span>
          </div>

          <ul className="pin-preview-list">
            {maskedPins.map((value, index) => (
              <li key={index}>
                <span className="summary-label">Round {index + 1}</span>
                <span className="summary-value">{value}</span>
              </li>
            ))}
          </ul>

          <div className="status-card">
            <p className="label">Opponent last guess</p>
            <p className="lede">3 2 8 1 4 → 🟧 ⬜️ 🟩 ⬜️ ⬜️</p>
            <p className="field-help">Use these to gauge how close they are and adjust your strategy.</p>
          </div>

          <div className="history-card">
            <div className="history-head">
              <div>
                <p className="eyebrow">Your attempts</p>
                <h3>Guess history</h3>
              </div>
              <span className="chip muted">Live</span>
            </div>
            <ul className="guess-history" aria-live="polite">
              {guessHistory.length === 0 && <li className="muted">No guesses yet. Try a combination to get feedback.</li>}
              {guessHistory.map((entry, index) => (
                <li key={`${entry.round}-${index}`} className="history-row">
                  <span className="summary-label">Round {entry.round}</span>
                  <span className="summary-value">{entry.guess}</span>
                  <span className="history-feedback">{entry.feedback}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
