import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/',
  headers: { 'Content-Type': 'application/json' },
})

export async function searchSignals(params) {
  const res = await api.get('/api/signals', { params })
  return res.data
}

export async function getSignalCases(eventName, params) {
  const res = await api.get(`/api/signals/${encodeURIComponent(eventName)}/cases`, { params })
  return res.data
}

export default api
