const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export async function apiRequest(path, options = {}) {
  const token = sessionStorage.getItem('medcard_token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || `Помилка запиту (${response.status})`);
  return payload;
}
