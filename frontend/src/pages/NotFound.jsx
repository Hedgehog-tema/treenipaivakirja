import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Sivua ei löytynyt.</p>
      <Link to="/" className="btn btn-primary">Takaisin etusivulle</Link>
    </div>
  );
}