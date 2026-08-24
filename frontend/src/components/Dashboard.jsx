import { useState } from 'react'
import Header from './Header'
import HabitCard from './HabitCard'
import AddHabit from './AddHabit'

function formatDate() {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())
}

export default function Dashboard({ user, habits, dashboard, streaks, completedIds, onAdd, onComplete, onDelete, busyHabit, error, onSignOut }) {
  const [showAdd, setShowAdd] = useState(false)
  const completedToday = dashboard?.completedToday ?? 0
  const totalHabits = dashboard?.totalHabits ?? habits.length
  const progress = totalHabits ? Math.round((completedToday / totalHabits) * 100) : 0

  return (
    <div className="app-shell">
      <Header user={user} onSignOut={onSignOut} />
      <main className="dashboard">
        <section className="welcome-row">
          <div>
            <p className="date-label">{formatDate()}</p>
            <h1>Good morning, {user.name.split(' ')[0]}.</h1>
            <p className="welcome-note">A little consistency goes a long way.</p>
          </div>
          <div className="plant-drawing plant-dashboard" aria-hidden="true"><span className="stem" /><i /><i /><i /><i /></div>
        </section>

        {error && <div className="error-banner" role="alert">{error}</div>}

        <section className="summary-grid" aria-label="Today's overview">
          <div className="summary-card summary-main"><div><p className="eyebrow">Today's overview</p><strong>{completedToday}<span>/{totalHabits}</span></strong><p>habits completed</p></div><div className="progress-ring" style={{ '--progress': `${progress * 3.6}deg` }}><span>{progress}%</span></div></div>
          <div className="summary-card"><p className="eyebrow">Consistency</p><strong>{dashboard?.consistencyScore ?? 0}<span>%</span></strong><p>today's rhythm</p></div>
          <div className="summary-card"><p className="eyebrow">Habits in focus</p><strong>{totalHabits}</strong><p>{totalHabits === 1 ? 'daily intention' : 'daily intentions'}</p></div>
        </section>

        <section className="habits-section">
          <div className="section-heading"><div><p className="eyebrow">Your routines</p><h2>Keep showing up</h2></div><button className="primary-button add-button" onClick={() => setShowAdd(true)}><span aria-hidden="true">+</span> Add habit</button></div>
          {habits.length === 0 ? <div className="empty-state"><div className="empty-sprout" aria-hidden="true" /><h3>Make room for a new rhythm</h3><p>Choose one small habit to begin with today.</p><button className="secondary-button" onClick={() => setShowAdd(true)}>Add your first habit</button></div> : <div className="habit-grid">{habits.map((habit) => <HabitCard key={habit.id} habit={habit} streak={streaks[habit.id]} completed={completedIds.has(habit.id)} onComplete={() => onComplete(habit)} onDelete={onDelete} busy={busyHabit === habit.id} />)}</div>}
        </section>
        <p className="footer-note">Progress is built one ordinary day at a time.</p>
      </main>
      {showAdd && <AddHabit busy={false} onClose={() => setShowAdd(false)} onAdd={(payload) => { onAdd(payload); setShowAdd(false) }} />}
    </div>
  )
}
