import '../App.css';

interface HeroSectionProps {
  onShowRules: () => void;
}

export function HeroSection({ onShowRules }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Multiplayer number guessing</p>
        <h1>
          Crack the code.
          <span className="gradient-text"> Outsmart your rival.</span>
        </h1>
        <p className="lede">
          Pick your pin length, set your timer, and dive into a whimsical duel of digits. Play solo to warm up or invite a friend
          for a realtime battle.
        </p>
        <div className="cta-row">
          <button className="primary" onClick={onShowRules}>
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
  );
}
