import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTreeni } from '../api/treenit';
import ErrorMessage from '../components/ErrorMessage';

const LAJIT = ['juoksu', 'pyöräily', 'uinti', 'hiihto', 'kävely', 'muu'];

const initialForm = {
  laji: 'juoksu',
  kesto: '',
  matka: '',
  syke: '',
  fiilis: '',
  paiva: new Date().toISOString().slice(0, 10),
  muistiinpanot: '',
};

export default function TreeniCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const errs = {};
    if (!form.laji) errs.laji = 'Valitse laji';
    if (!form.kesto || Number(form.kesto) <= 0) errs.kesto = 'Keston on oltava positiivinen luku';
    if (!form.paiva) errs.paiva = 'Päivä on pakollinen';
    if (form.matka && Number(form.matka) < 0) errs.matka = 'Matka ei voi olla negatiivinen';
    if (form.syke && Number(form.syke) < 0) errs.syke = 'Syke ei voi olla negatiivinen';
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
      const created = await createTreeni(payload);
      navigate(`/treenit/${created.id}`);
    } catch (err) {
      setServerError(err.message);
      setSaving(false);
    }
  }

  return (
    <div>
      <Link to="/" className="back-link">← Takaisin listaan</Link>
      <h1>Lisää treeni</h1>
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
          {errors.matka && <span className="field-error">{errors.matka}</span>}
        </label>
        <label>
          Syke
          <input type="number" name="syke" value={form.syke} onChange={handleChange} min="0" />
          {errors.syke && <span className="field-error">{errors.syke}</span>}
        </label>
        <label>
          Fiilis
          <input type="text" name="fiilis" value={form.fiilis} onChange={handleChange} placeholder="esim. hyvä, kova" />
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
            {saving ? 'Tallennetaan...' : 'Tallenna'}
          </button>
          <Link to="/" className="btn btn-secondary">Peruuta</Link>
        </div>
      </form>
    </div>
  );
}