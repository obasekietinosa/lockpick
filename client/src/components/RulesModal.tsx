import '../App.css';

interface RulesModalProps {
  open: boolean;
  rules: string[];
  onClose: () => void;
}

export function RulesModal({ open, rules, onClose }: RulesModalProps) {
  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Game rules">
      <div className="modal">
        <header className="modal-head">
          <div>
            <p className="eyebrow">Rulebook</p>
            <h3>How to win a match</h3>
          </div>
          <button className="ghost" onClick={onClose}>
            Close
          </button>
        </header>
        <ul className="rule-list">
          {rules.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button className="primary full" onClick={onClose}>
          Got it, let's play
        </button>
      </div>
    </div>
  );
}
