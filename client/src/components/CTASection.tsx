import '../App.css';

interface CTASectionProps {
  onStartSolo: () => void;
  onInvite: () => void;
}

export function CTASection({ onStartSolo, onInvite }: CTASectionProps) {
  return (
    <section className="cta" aria-label="Call to action">
      <div>
        <p className="eyebrow">Ready when you are</p>
        <h2>Play a round in under a minute</h2>
        <p className="section-lede">
          Warm up with solo practice, then invite someone to see who cracks the code first.
        </p>
      </div>
      <div className="cta-actions">
        <button className="primary" onClick={onStartSolo}>
          Set up my game
        </button>
        <button className="secondary" onClick={onInvite}>
          Join or share a lobby
        </button>
      </div>
    </section>
  );
}
