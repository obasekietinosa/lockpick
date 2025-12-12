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

function App() {
  const [showRules, setShowRules] = useState(false);

  const ruleItems = useMemo(
    () => rules.map((line, index) => `${index + 1}. ${line}`),
    [],
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
