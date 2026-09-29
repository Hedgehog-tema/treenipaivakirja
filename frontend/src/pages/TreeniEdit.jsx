import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchTreeni, updateTreeni } from '../api/treenit';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const LAJIT = ['juoksu', 'pyöräily', 'uinti', 'hiihto', 'kävely', 'muu'];

export default function TreeniEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchTreeni(id);
        setForm({
          laji: data.laji,
          kesto: data.kesto,
          matka: data.matka,
          syke: data.syke,
          fiilis: data.fiilis || '',
          paiva: data.paiva,
          muistiinpanot: data.muistiinpanot || '',
        });
      } catch (err) {
        setServerError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const errs = {};
    if (!form.laji) errs.laji = 'Valitse laji';
    if (!form.kesto || Number(form.kesto) <= 0) errs.kesto = 'Keston on oltava positiivinen luku';
    if (!form.paiva) errs.paiva = 'Päivä on pakollinen';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = {
        laji: form.laji,
        kesto: Number(form.kesto),
        matka: form.matka ? Number(form.matka) : 0,
        syke: form.syke ? Number(form.syke) : 0,
        fiilis: form.fiilis,
        paiva: form.paiva,
        muistiinpanot: form.muistiinpanot,
      };
      await updateTreeni(id, payload);
      navigate(`/treenit/${id}`);
    } catch (err) {
      setServerError(err.message);
      setSaving(false);
    }
  }

  if (loading) return <Loading />;
  if (!form) return <ErrorMessage message={serverError || 'Treeniä ei löytynyt'} />;

  return (
    <div>
      <Link to={`/treenit/${id}`} className="back-link">← Takaisin</Link>
      <h1>Muokkaa treeniä</h1>
      {serverError && <ErrorMessage message={serverError} />}
      <form onSubmit={handleSubmit} className="form" noValidate>
        <label>
          Laji
          <select name="laji" value={form.laji} onChange={handleChange}>
            {LAJIT.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          {errors.laji && <span className="field-error">{errors.laji}</span>}
        </label>
        <label>
          Kesto (min)
          <input type="number" name="kesto" value={form.kesto} onChange={handleChange} min="1" />
          {errors.kesto && <span className="field-error">{errors.kesto}</span>}
        </label>
        <label>
          Matka (km)
          <input type="number" name="matka" value={form.matka} onChange={handleChange} min="0" step="0.1" />
        </label>
        <label>
          Syke
          <input type="number" name="syke" value={form.syke} onChange={handleChange} min="0" />
        </label>
        <label>
          Fiilis
          <input type="text" name="fiilis" value={form.fiilis} onChange={handleChange} />
        </label>
        <label>
          Päivä
          <input type="date" name="paiva" value={form.paiva} onChange={handleChange} />
          {errors.paiva && <span className="field-error">{errors.paiva}</span>}
        </label>
        <label>
          Muistiinpanot
          <textarea name="muistiinpanot" value={form.muistiinpanot} onChange={handleChange} rows="3" />
        </label>
        <div className="actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Tallennetaan...' : 'Tallenna muutokset'}
          </button>
          <Link to={`/treenit/${id}`} className="btn btn-secondary">Peruuta</Link>
        </div>
      </form>
    </div>
  );
}