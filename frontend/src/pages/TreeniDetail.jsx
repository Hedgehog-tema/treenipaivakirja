import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchTreeni, deleteTreeni } from '../api/treenit';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function TreeniDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [treeni, setTreeni] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTreeni(id);
      setTreeni(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  async function handleDelete() {
    if (!window.confirm('Haluatko varmasti poistaa tämän treenin?')) return;
    setDeleting(true);
    try {
      await deleteTreeni(id);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  }

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;
  if (!treeni) return null;

  return (
    <div>
      <Link to="/" className="back-link">← Takaisin listaan</Link>
      <h1>{treeni.laji}</h1>
      <dl className="details">
        <dt>Päivä</dt><dd>{treeni.paiva}</dd>
        <dt>Kesto</dt><dd>{treeni.kesto} min</dd>
        <dt>Matka</dt><dd>{treeni.matka} km</dd>
        <dt>Syke</dt><dd>{treeni.syke}</dd>
        <dt>Fiilis</dt><dd>{treeni.fiilis || '—'}</dd>
        <dt>Muistiinpanot</dt><dd>{treeni.muistiinpanot || '—'}</dd>
      </dl>
      <div className="actions">
        <Link to={`/treenit/${treeni.id}/muokkaa`} className="btn btn-primary">
          Muokkaa
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="btn btn-danger"
        >
          {deleting ? 'Poistetaan...' : 'Poista'}
        </button>
      </div>
    </div>
  );
}