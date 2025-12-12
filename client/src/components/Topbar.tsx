import { Link } from 'react-router-dom';
import '../App.css';

interface TopbarProps {
  onShowRules: () => void;
}

export function Topbar({ onShowRules }: TopbarProps) {
  return (
    <header className="topbar">
      <Link to="/" className="logo" aria-label="Lockpick home">
        <span className="logo-lock">🔓</span>
        <span className="logo-word">Lockpick</span>
      </Link>
      <nav className="top-actions" aria-label="Primary">
        <button className="ghost" onClick={onShowRules}>
          Game rules
        </button>
        <Link to="/config" className="primary">
          Play now
        </Link>
      </nav>
    </header>
  );
}
