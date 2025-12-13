import { Link } from 'react-router-dom';
import { highlightCards, journeySteps, rules } from '../constants';

export default function LandingPage() {
  return (
    <div className="landing">
      <section className="hero-grid">
        <div className="hero-card">
          <span className="hero-kicker">Multiplayer codebreaking</span>
          <h1 className="hero-title">Crack the lock before your rival does.</h1>
          <p className="hero-subtitle">
            Lockpick is a realtime number guessing duel. Choose your rules, set three pins, and race an opponent to decode their
            secret before the timer runs out.
          </p>
          <div className="hero-actions">
            <Link to="/configure" className="primary-button">
              Start a fresh run
            </Link>
            <Link to="/join" className="ghost-button">
              Join a lobby
            </Link>
          </div>
        </div>
        <div className="card">
          <h3 className="card-title">Rules at a glance</h3>
          <ol className="rule-list">
            {rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ol>
          <p className="muted" style={{ marginTop: '0.75rem' }}>
            Hints glow 🟩 for correct digits, 🟧 for correct digits in the wrong slot, and ⬜️ for everything else.
          </p>
        </div>
      </section>

      <section>
        <div className="section-head">
          <h2 className="section-title">Why this reboot?</h2>
          <p className="muted">
            We are restarting the project with a simpler, opinionated baseline. The goal is to make room for rapid iteration on
            the flows outlined in the wireframes while keeping the aesthetic playful and mobile-friendly.
          </p>
        </div>
        <div className="section-grid">
          {highlightCards.map((card) => (
            <article className="card" key={card.title}>
              <h3 className="card-title">{card.title}</h3>
              <p className="muted">{card.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <h2 className="section-title">From landing to victory</h2>
          <p className="muted">A concise walkthrough of the experiences described in the README.</p>
        </div>
        <div className="card">
          <div className="stepper">
            {journeySteps.map((step, index) => (
              <div className="step-item" key={step.title}>
                <span className="step-index">{index + 1}</span>
                <div>
                  <h3 className="card-title">{step.title}</h3>
                  <p className="muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
