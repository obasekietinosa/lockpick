import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/configure', label: 'Configure' },
  { to: '/join', label: 'Join' },
  { to: '/pins', label: 'Pins' },
  { to: '/play', label: 'Play' },
];

export function AppLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="app-shell">
      <div className="app-bg" aria-hidden />
      <header className="app-header">
        <Link to="/" className="brand" aria-label="Lockpick home">
          <span className="brand-mark">🔒</span>
          <span className="brand-word">lockpick</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <Link to="/configure" className="ghost-button">
            Plan a match
          </Link>
          <Link to="/join" className="primary-button">
            Join lobby
          </Link>
        </div>
      </header>
      <main className={isLanding ? 'page page--wide' : 'page'}>
        <Outlet />
      </main>
      <footer className="app-footer">
        <p className="footer-copy">
          Built for fast-paced number cracking. Multiplayer support, realtime updates, and mobile-first layouts are in scope from
          day one.
        </p>
        <div className="footer-meta">
          <span>Express + Socket.io backend</span>
          <span aria-hidden>•</span>
          <span>React + Vite frontend</span>
        </div>
      </footer>
    </div>
  );
}
