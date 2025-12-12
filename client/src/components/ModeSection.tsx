import { modes } from '../constants';
import '../App.css';

export function ModeSection() {
  return (
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
  );
}
