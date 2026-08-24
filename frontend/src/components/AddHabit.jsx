import { useState } from 'react'

export default function AddHabit({ onAdd, onClose, busy }) {
  const [name, setName] = useState('')
  const [target, setTarget] = useState('5')

  function submit(event) {
    event.preventDefault()
    if (!name.trim()) return
    onAdd({ name: name.trim(), target_days_per_week: Number(target) })
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <form className="add-habit-modal" onSubmit={submit} onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-heading">
          <div>
            <p className="eyebrow">New routine</p>
            <h2>Add a habit</h2>
          </div>
          <button type="button" className="icon-button large" onClick={onClose} aria-label="Close">×</button>
        </div>
        <label>
          Habit name
          <input autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Read for 20 minutes" maxLength="80" />
        </label>
        <label>
          Target days per week
          <select value={target} onChange={(event) => setTarget(event.target.value)}>
            {[1, 2, 3, 4, 5, 6, 7].map((days) => <option key={days} value={days}>{days} {days === 1 ? 'day' : 'days'}</option>)}
          </select>
        </label>
        <button className="primary-button modal-submit" disabled={!name.trim() || busy}>{busy ? 'Adding habit...' : 'Add habit'}</button>
      </form>
    </div>
  )
}
