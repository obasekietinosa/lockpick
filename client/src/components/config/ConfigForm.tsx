import { TimerValue, timerOptions } from '../../constants';
import '../../App.css';

type ConfigFormProps = {
  playerName: string;
  pinLength: number;
  hintsEnabled: boolean;
  timer: TimerValue;
  onPlayerNameChange: (value: string) => void;
  onPinLengthChange: (value: number) => void;
  onHintsChange: (enabled: boolean) => void;
  onTimerChange: (value: TimerValue) => void;
  onStartGame: () => void;
  onJoinGame: () => void;
};

export function ConfigForm({
  playerName,
  pinLength,
  hintsEnabled,
  timer,
  onPlayerNameChange,
  onPinLengthChange,
  onHintsChange,
  onTimerChange,
  onStartGame,
  onJoinGame,
}: ConfigFormProps) {
  return (
    <div className="config-card">
      <div className="field">
        <label htmlFor="player-name">Player name</label>
        <input
          id="player-name"
          name="playerName"
          value={playerName}
          onChange={(event) => onPlayerNameChange(event.target.value)}
          placeholder="Ada the Analyst"
          autoComplete="name"
        />
        <p className="field-help">We will use this in lobbies, invites, and scoreboards.</p>
      </div>

      <div className="field">
        <div className="field-head">
          <div>
            <p className="eyebrow">Pin length</p>
            <h3>Choose digits per round</h3>
          </div>
          <span className="badge muted">Required</span>
        </div>
        <div className="chip-row">
          {[5, 7, 10].map((length) => (
            <button
              key={length}
              type="button"
              className={`chip ${pinLength === length ? 'active' : ''}`}
              aria-pressed={pinLength === length}
              onClick={() => onPinLengthChange(length)}
            >
              {length} digits
            </button>
          ))}
        </div>
        <p className="field-help">Both players use the same pin length for all three rounds.</p>
      </div>

      <div className="field">
        <div className="field-head">
          <div>
            <p className="eyebrow">Hint mode</p>
            <h3>Decide how much feedback you want</h3>
          </div>
          <span className="badge">Popular</span>
        </div>
        <div className="toggle-row" role="group" aria-label="Hint mode">
          <button
            type="button"
            className={`toggle ${hintsEnabled ? 'active' : ''}`}
            aria-pressed={hintsEnabled}
            onClick={() => onHintsChange(true)}
          >
            Hints on
          </button>
          <button
            type="button"
            className={`toggle ${!hintsEnabled ? 'active' : ''}`}
            aria-pressed={!hintsEnabled}
            onClick={() => onHintsChange(false)}
          >
            Hints off
          </button>
        </div>
        <p className="field-help">
          Hints add orange markers for correct digits in the wrong slot; turning them off shows only exact matches.
        </p>
      </div>

      <div className="field">
        <div className="field-head">
          <div>
            <p className="eyebrow">Timer per round</p>
            <h3>Pick your pacing</h3>
          </div>
          <span className="chip ghost-chip">3 rounds total</span>
        </div>
        <div className="option-grid" role="radiogroup" aria-label="Timer per round">
          {timerOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`option-card ${timer === option.value ? 'active' : ''}`}
              onClick={() => onTimerChange(option.value)}
              aria-pressed={timer === option.value}
            >
              <div className="option-top">
                <span className="chip muted">{option.label}</span>
                {timer === option.value && <span className="status-dot" aria-hidden />}
              </div>
              <p className="option-detail">{option.detail}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="cta-row">
        <button className="primary" type="button" onClick={onStartGame}>
          Start new game
        </button>
        <button className="secondary" type="button" onClick={onJoinGame}>
          Join existing game
        </button>
      </div>
    </div>
  );
}
