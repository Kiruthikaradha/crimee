import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 10000,
});

const readStoredToken = () => {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('crimevision-token');
};

const persistToken = (token: string | null) => {
  if (typeof window === 'undefined') return;
  if (token) {
    window.localStorage.setItem('crimevision-token', token);
  } else {
    window.localStorage.removeItem('crimevision-token');
  }
};

api.interceptors.request.use((config) => {
  const token = readStoredToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  login: (payload: { username: string; password: string }) =>
    api.post('/auth/login', payload).then((res) => {
      persistToken(res.data.access_token);
      return res.data;
    }),
  getDashboard: () => api.get('/dashboard').then((res) => res.data),
  getCrimes: () => api.get('/crimes').then((res) => res.data),
  getHeatmap: () => api.get('/heatmap').then((res) => res.data),
  getAnalytics: () => api.get('/analytics').then((res) => res.data),
  getHotspots: () => api.get('/hotspots').then((res) => res.data),
  getReports: () => api.get('/reports').then((res) => res.data),
  getAlerts: () => api.get('/alerts').then((res) => res.data),
  getSafeRoute: () => api.get('/safe-route').then((res) => res.data),
  predictCrime: (payload: unknown) => api.post('/ml/predict', payload).then((res) => res.data),
  explainPrediction: (payload: unknown) => api.post('/ml/explain', payload).then((res) => res.data),
  getForecast: (payload: { horizon: string; location: string }) => api.post('/forecast', payload).then((res) => res.data),
};
