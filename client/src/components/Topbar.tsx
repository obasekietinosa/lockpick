import '../App.css';

interface TopbarProps {
  onShowRules: () => void;
}

export function Topbar({ onShowRules }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="logo">
        <span className="logo-lock">🔓</span>
        <span className="logo-word">Lockpick</span>
      </div>
      <nav className="top-actions" aria-label="Primary">
        <button className="ghost" onClick={onShowRules}>
          Game rules
        </button>
        <button className="primary">Play now</button>
      </nav>
    </header>
  );
}
