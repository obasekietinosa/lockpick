import { useMemo, useState } from 'react';
import './App.css';

const rules = [
  'Guess your opponent\'s secret pin before the timer hits zero.',
  'Pins can be 5, 7, or 10 digits and each round uses the same length.',
  'Hints show which digits are correct and whether they belong in a different slot.',
  'Rounds last up to 3 minutes; win the most rounds to win the match.',
];

const modes = [
  {
    title: 'Solo practice',
    description: 'Beat the clock with adaptive difficulty to sharpen your pattern spotting.',
    badge: 'Fast start',
  },
  {
    title: 'Challenge a friend',
    description: 'Create a room and send a link to duel someone you know.',
    badge: 'Head-to-head',
  },
  {
    title: 'Find a rival',
    description: 'Queue up and match with another codebreaker who picked similar rules.',
    badge: 'Realtime',
  },
];

const highlights = [
  {
    title: 'Realtime multiplayer',
    detail: 'Sockets keep turns perfectly in sync with low-latency updates.',
  },
  {
    title: 'Playful design',
    detail: 'Whimsical gradients, animated locks, and celebratory confetti keep wins memorable.',
  },
  {
    title: 'Accessible on mobile',
    detail: 'Thumb-friendly buttons, large inputs, and layouts that flex down to small screens.',
  },
  {
    title: 'Configurable rounds',
    detail: 'Pick pin lengths, timers, and hint modes before you hit Ready.',
  },
];

const timerOptions = [
  { value: 'none', label: 'No timer', detail: 'Play at your own pace without a countdown.' },
  { value: '30s', label: '30 seconds', detail: 'Default sprint that keeps the tension high.' },
  { value: '1m', label: '1 minute', detail: 'Balanced window to think and adapt.' },
  { value: '3m', label: '3 minutes', detail: 'Deep-dive rounds for methodical codebreakers.' },
];

function App() {
  const [showRules, setShowRules] = useState(false);
  const [playerName, setPlayerName] = useState('Player 1');
  const [pinLength, setPinLength] = useState(5);
  const [timer, setTimer] = useState<'none' | '30s' | '1m' | '3m'>('30s');
  const [hintsEnabled, setHintsEnabled] = useState(true);

  const ruleItems = useMemo(
    () => rules.map((line, index) => `${index + 1}. ${line}`),
    [],
  );

  const timerCopy = useMemo(
    () => timerOptions.find((option) => option.value === timer),
    [timer],
  );

  return (
    <div className="page">
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <header className="topbar">
        <div className="logo">
          <span className="logo-lock">🔓</span>
          <span className="logo-word">Lockpick</span>
        </div>
        <nav className="top-actions" aria-label="Primary">
          <button className="ghost" onClick={() => setShowRules(true)}>
            Game rules
          </button>
          <button className="primary">Play now</button>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Multiplayer number guessing</p>
            <h1>
              Crack the code.
              <span className="gradient-text"> Outsmart your rival.</span>
            </h1>
            <p className="lede">
              Pick your pin length, set your timer, and dive into a whimsical duel of digits. Play solo to warm up or invite a
              friend for a realtime battle.
            </p>
            <div className="cta-row">
              <button className="primary" onClick={() => setShowRules(true)}>
                View the rules
              </button>
              <button className="secondary">Start a match</button>
            </div>
            <div className="pill-row" aria-label="Highlights">
              <div className="pill">🎯 Precision feedback</div>
              <div className="pill">⏱️ 30s - 3m timers</div>
              <div className="pill">🤝 Solo & multiplayer</div>
            </div>
          </div>
          <div className="hero-card" role="presentation">
            <div className="card-head">
              <p className="badge">Live duel</p>
              <span className="chip">Round 2 / 3</span>
            </div>
            <div className="score">
              <div>
                <p className="label">You</p>
                <p className="score-value">2 🔒</p>
              </div>
              <div>
                <p className="label">Rival</p>
                <p className="score-value">1 🔒</p>
              </div>
            </div>
            <div className="pin-input" aria-label="Pin inputs">
              {['?', '?', '?', '?', '?'].map((char, index) => (
                <span key={index} className="pin-slot">
                  {char}
                </span>
              ))}
            </div>
            <div className="hint">
              <span className="dot correct" /> Green = correct spot
            </div>
            <div className="hint">
              <span className="dot misplaced" /> Orange = right digit, wrong spot
            </div>
            <button className="primary full">Start game</button>
          </div>
        </section>

        <section className="config" aria-label="Rule configuration">
          <div className="section-head">
            <div>
              <p className="eyebrow">Dial in your rules</p>
              <h2>Configure a match before you play</h2>
            </div>
            <p className="section-lede">
              Choose how many digits to guess, whether to show hint colors, and how long each round should run. Your selections
              update the summary so you can share or save them.
            </p>
          </div>

          <div className="config-grid">
            <div className="config-card">
              <div className="field">
                <label htmlFor="player-name">Player name</label>
                <input
                  id="player-name"
                  name="playerName"
                  value={playerName}
                  onChange={(event) => setPlayerName(event.target.value)}
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
                      onClick={() => setPinLength(length)}
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
                    onClick={() => setHintsEnabled(true)}
                  >
                    Hints on
                  </button>
                  <button
                    type="button"
                    className={`toggle ${!hintsEnabled ? 'active' : ''}`}
                    aria-pressed={!hintsEnabled}
                    onClick={() => setHintsEnabled(false)}
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
                      onClick={() => setTimer(option.value as typeof timer)}
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
                <button className="primary">Start new game</button>
                <button className="secondary">Join existing game</button>
              </div>
            </div>

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
                  <span className="summary-value">{timerCopy?.label}</span>
                </li>
              </ul>

              <div className="preview-card" role="presentation">
                <div className="preview-row">
                  <span className="chip">Round 1 of 3</span>
                  <span className="chip muted">{timerCopy?.label}</span>
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
            </div>
          </div>
        </section>

        <section className="modes" aria-label="Game modes">
          <div className="section-head">
            <div>
              <p className="eyebrow">Pick your vibe</p>
              <h2>Start the way you want</h2>
            </div>
            <p className="section-lede">
              Every journey begins with a single guess. Choose a quick solo sprint, invite a friend, or queue for a rival to test your
              instincts.
            </p>
          </div>
          <div className="mode-grid">
            {modes.map((mode) => (
              <article className="mode-card" key={mode.title}>
                <span className="badge muted">{mode.badge}</span>
                <h3>{mode.title}</h3>
                <p>{mode.description}</p>
                <button className="ghost">Set it up</button>
              </article>
            ))}
          </div>
        </section>

        <section className="highlights" aria-label="Highlights">
          <div className="section-head">
            <div>
              <p className="eyebrow">Why Lockpick</p>
              <h2>Built for quick, clever play</h2>
            </div>
            <p className="section-lede">
              Snappy rounds, juicy feedback, and inputs that stay comfortable on thumbs mean you can battle from the couch, the bus, or
              anywhere in between.
            </p>
          </div>
          <div className="highlight-grid">
            {highlights.map((item) => (
              <article className="highlight-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="steps" aria-label="How it works">
          <div className="section-head">
            <div>
              <p className="eyebrow">Quick start</p>
              <h2>Three steps and you\'re in</h2>
            </div>
            <p className="section-lede">
              Configure, lock in your digits, and start guessing with haptic-friendly controls that keep you in the flow.
            </p>
          </div>
          <ol className="step-list">
            <li>
              <div className="step-number">1</div>
              <div>
                <h3>Pick your rules</h3>
                <p>Length, hints, and timers set the tone for the match.</p>
              </div>
            </li>
            <li>
              <div className="step-number">2</div>
              <div>
                <h3>Share or queue</h3>
                <p>Drop a link to a friend or find a rival who wants the same rules.</p>
              </div>
            </li>
            <li>
              <div className="step-number">3</div>
              <div>
                <h3>Guess the pin</h3>
                <p>Type, swipe, and submit. Fast feedback keeps each round tense.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="cta" aria-label="Call to action">
          <div>
            <p className="eyebrow">Ready when you are</p>
            <h2>Play a round in under a minute</h2>
            <p className="section-lede">
              Warm up with solo practice, then invite someone to see who cracks the code first.
            </p>
          </div>
          <div className="cta-actions">
            <button className="primary">Launch solo mode</button>
            <button className="secondary">Invite a friend</button>
          </div>
        </section>
      </main>

      {showRules && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Game rules">
          <div className="modal">
            <header className="modal-head">
              <div>
                <p className="eyebrow">Rulebook</p>
                <h3>How to win a match</h3>
              </div>
              <button className="ghost" onClick={() => setShowRules(false)}>
                Close
              </button>
            </header>
            <ul className="rule-list">
              {ruleItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button className="primary full" onClick={() => setShowRules(false)}>
              Got it, let\'s play
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
