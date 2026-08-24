const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

  if (!response.ok) {
    let message = 'Something went wrong. Please try again.'
    try {
      const body = await response.json()
      message = body.detail || message
    } catch {
      message = response.statusText || message
    }
    throw new Error(message)
  }

  return response.status === 204 ? null : response.json()
}

export const api = {
  createUser: (payload) => request('/users', { method: 'POST', body: JSON.stringify(payload) }),
  getUser: (userId) => request(`/users/${userId}`),
  getHabits: (userId) => request(`/users/${userId}/habits`),
  getDashboard: (userId) => request(`/users/${userId}/dashboard`),
  createHabit: (payload) => request('/habits', { method: 'POST', body: JSON.stringify(payload) }),
  deleteHabit: (habitId) => request(`/habits/${habitId}`, { method: 'DELETE' }),
  getStreak: (habitId) => request(`/habits/${habitId}/streak`),
  logHabit: (habitId) => request(`/habits/${habitId}/logs`, {
    method: 'POST',
    body: JSON.stringify({ log_date: new Date().toISOString(), completed: true }),
  }),
}
