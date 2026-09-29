import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">
          Treenipäiväkirja
        </Link>
        <nav>
          <Link to="/" className="nav-link">Lista</Link>
          <Link to="/treenit/uusi" className="nav-link nav-link-primary">
            + Lisää treeni
          </Link>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <p>Artem Komarov — Full-stack projektityö</p>
      </footer>
    </div>
  );
}