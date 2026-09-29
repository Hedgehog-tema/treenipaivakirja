import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTreenit } from '../api/treenit';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function TreeniList() {
  const [treenit, setTreenit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTreenit();
      setTreenit(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <Loading text="Ladataan treenejä..." />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;

  if (treenit.length === 0) {
    return (
      <div className="empty">
        <p>Ei treenejä vielä.</p>
        <Link to="/treenit/uusi" className="btn btn-primary">
          Lisää ensimmäinen treeni
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Treenit</h1>
      <p className="muted">Yhteensä {treenit.length} treeniä</p>
      <ul className="treeni-list">
        {treenit.map((t) => (
          <li key={t.id} className="treeni-item">
            <Link to={`/treenit/${t.id}`} className="treeni-link">
              <div>
                <strong>{t.laji}</strong>
                <span className="muted"> — {t.paiva}</span>
              </div>
              <div className="muted">
                {t.kesto} min · {t.matka} km · syke {t.syke}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}