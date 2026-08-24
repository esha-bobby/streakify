import { useEffect, useState } from 'react'
import { api } from './api'
import EntryScreen from './components/EntryScreen'
import Dashboard from './components/Dashboard'

const USER_KEY = 'streakify_user_id'

export default function App() {
  const [user, setUser] = useState(null)
  const [habits, setHabits] = useState([])
  const [dashboard, setDashboard] = useState(null)
  const [streaks, setStreaks] = useState({})
  const [loading, setLoading] = useState(true)
  const [entryLoading, setEntryLoading] = useState(false)
  const [busyHabit, setBusyHabit] = useState(null)
  const [error, setError] = useState('')
  const [completedIds, setCompletedIds] = useState(new Set())

  async function loadUser(userId) {
    setLoading(true)
    setError('')
    try {
      const [userData, habitData, dashboardData] = await Promise.all([api.getUser(userId), api.getHabits(userId), api.getDashboard(userId)])
      setUser(userData)
      setHabits(habitData)
      setDashboard(dashboardData)
      const results = await Promise.all(habitData.map(async (habit) => [habit.id, await api.getStreak(habit.id)]))
      setStreaks(Object.fromEntries(results))
    } catch (loadError) {
      localStorage.removeItem(USER_KEY)
      setError(loadError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const savedUserId = localStorage.getItem(USER_KEY)
    if (savedUserId) loadUser(savedUserId)
    else setLoading(false)
  }, [])

  async function enter(data) {
    setEntryLoading(true)
    setError('')
    try {
      const created = await api.createUser(data)
      localStorage.setItem(USER_KEY, created.id)
      await loadUser(created.id)
    } catch (entryError) {
      setError(entryError.message)
    } finally {
      setEntryLoading(false)
    }
  }

  async function addHabit(payload) {
    setError('')
    try {
      const habit = await api.createHabit({ ...payload, user_id: user.id })
      setHabits((current) => [...current, habit])
      setStreaks((current) => ({ ...current, [habit.id]: { current_streak: 0, longest_streak: 0 } }))
      setDashboard((current) => ({ ...current, totalHabits: (current?.totalHabits ?? 0) + 1, activeHabits: (current?.activeHabits ?? 0) + 1 }))
    } catch (habitError) { setError(habitError.message) }
  }

  async function completeHabit(habit) {
    setBusyHabit(habit.id)
    setError('')
    try {
      await api.logHabit(habit.id)
      setCompletedIds((current) => new Set(current).add(habit.id))
      setDashboard((current) => ({ ...current, completedToday: (current?.completedToday ?? 0) + 1, consistencyScore: habits.length ? Math.round(((current?.completedToday ?? 0) + 1) / habits.length * 100) : 0 }))
      setStreaks((current) => ({ ...current, [habit.id]: { ...current[habit.id], current_streak: (current[habit.id]?.current_streak ?? 0) + 1 } }))
    } catch (logError) { setError(logError.message) }
    finally { setBusyHabit(null) }
  }

  async function deleteHabit(habit) {
    if (!window.confirm(`Delete ${habit.name}?`)) return
    setError('')
    try {
      await api.deleteHabit(habit.id)
      setHabits((current) => current.filter((item) => item.id !== habit.id))
      setDashboard((current) => ({ ...current, totalHabits: Math.max(0, (current?.totalHabits ?? 1) - 1), activeHabits: Math.max(0, (current?.activeHabits ?? 1) - 1) }))
    } catch (deleteError) { setError(deleteError.message) }
  }

  function signOut() {
    localStorage.removeItem(USER_KEY)
    setUser(null)
    setHabits([])
    setDashboard(null)
    setCompletedIds(new Set())
  }

  if (loading) return <div className="loading-screen"><div className="loader-mark"><i /><i /><i /></div><p>Gathering your routines...</p></div>
  if (!user) return <EntryScreen onSubmit={enter} loading={entryLoading} error={error} />
  return <Dashboard user={user} habits={habits} dashboard={dashboard} streaks={streaks} completedIds={completedIds} onAdd={addHabit} onComplete={completeHabit} onDelete={deleteHabit} busyHabit={busyHabit} error={error} onSignOut={signOut} />
}
