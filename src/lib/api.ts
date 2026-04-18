const API_BASE_URL = 'http://localhost:5000/api';

// Simple api helper to manage auth token and json parsing
export const api = {
  getToken: () => localStorage.getItem('token'),
  setToken: (token: string) => localStorage.setItem('token', token),
  
  getAuthHeaders: () => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  },

  async login(email: string, password: string = 'password123') {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) this.setToken(data.token);
    return { ok: res.ok, data };
  },

  async register(name: string, email: string, password: string = 'password123') {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return { ok: res.ok, data: await res.json() };
  },

  async getAgencies(location?: string, available_only?: boolean) {
    let url = `${API_BASE_URL}/agencies?`;
    if (location) url += `location=${encodeURIComponent(location)}&`;
    if (available_only) url += `available_only=true&`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch agencies');
    return res.json();
  },

  async createBooking(agency_id: string) {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ agency_id })
    });
    if (!res.ok) throw new Error('Failed to create booking');
    return res.json();
  },

  async getBooking(id: string) {
    const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      headers: this.getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch booking');
    return res.json();
  },

  async getBookings() {
    const res = await fetch(`${API_BASE_URL}/bookings/user/me`, {
      headers: this.getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  }
};
