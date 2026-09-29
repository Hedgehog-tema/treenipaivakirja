const ALLOWED_LAJI = ['juoksu', 'pyöräily', 'uinti', 'hiihto', 'kävely', 'muu'];

export function validateTreeni(body, { partial = false } = {}) {
  const errors = [];

  const has = (field) => body[field] !== undefined;

  if (!partial || has('laji')) {
    if (!body.laji || typeof body.laji !== 'string') {
      errors.push('laji on pakollinen ja sen on oltava merkkijono');
    } else if (!ALLOWED_LAJI.includes(body.laji)) {
      errors.push(`laji on yksi seuraavista: ${ALLOWED_LAJI.join(', ')}`);
    }
  }

  if (!partial || has('kesto')) {
    if (typeof body.kesto !== 'number' || body.kesto <= 0) {
      errors.push('kesto on pakollinen ja sen on oltava positiivinen luku');
    }
  }

  if (!partial || has('matka')) {
    if (body.matka !== undefined && (typeof body.matka !== 'number' || body.matka < 0)) {
      errors.push('matka on oltava ei-negatiivinen luku');
    }
  }

  if (!partial || has('syke')) {
    if (body.syke !== undefined && (typeof body.syke !== 'number' || body.syke < 0)) {
      errors.push('syke on oltava ei-negatiivinen luku');
    }
  }

  if (!partial || has('paiva')) {
    if (!body.paiva || typeof body.paiva !== 'string') {
      errors.push('paiva on pakollinen ja muodossa YYYY-MM-DD');
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(body.paiva)) {
      errors.push('paiva on muodossa YYYY-MM-DD');
    }
  }

  return errors;
}