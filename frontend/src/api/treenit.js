const API_URL = 'http://localhost:3000/api/treenit';

async function handleResponse(res) {
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) {
    const message = data.errors ? data.errors.join(', ') : data.error || 'Tuntematon virhe';
    throw new Error(message);
  }
  return data;
}

export async function fetchTreenit() {
  const res = await fetch(API_URL);
  return handleResponse(res);
}

export async function fetchTreeni(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return handleResponse(res);
}

export async function createTreeni(treeni) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(treeni),
  });
  return handleResponse(res);
}

export async function updateTreeni(id, treeni) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(treeni),
  });
  return handleResponse(res);
}

export async function deleteTreeni(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}