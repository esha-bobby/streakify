function LeafIcon() {
  return <span className="leaf-icon" aria-hidden="true"><span /></span>
}

export default function HabitCard({ habit, streak, completed, onComplete, onDelete, busy }) {
  const target = habit.target_days_per_week
  return (
    <article className={`habit-card ${completed ? 'is-complete' : ''}`}>
      <div className="habit-card-top">
        <div className="habit-icon"><LeafIcon /></div>
        <button className="icon-button" onClick={() => onDelete(habit)} aria-label={`Delete ${habit.name}`} title="Delete habit">×</button>
      </div>
      <h3>{habit.name}</h3>
      <p className="habit-frequency">{target} {target === 1 ? 'day' : 'days'} per week</p>
      <div className="habit-card-footer">
        <div className="streak-readout">
          <strong>{streak?.current_streak ?? 0}</strong>
          <span>day streak</span>
        </div>
        <button className={`complete-button ${completed ? 'completed' : ''}`} onClick={onComplete} disabled={completed || busy}>
          <span className="check-circle" aria-hidden="true">{completed ? '✓' : ''}</span>
          {completed ? 'Logged today' : busy ? 'Saving...' : 'Log today'}
        </button>
      </div>
    </article>
  )
}
