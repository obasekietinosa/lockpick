import { highlights } from '../constants';
import '../App.css';

export function HighlightsSection() {
  return (
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
  );
}
