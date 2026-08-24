import { useState } from 'react'

export default function EntryScreen({ onSubmit, loading, error }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  function submit(event) {
    event.preventDefault()
    if (name.trim() && email.trim()) onSubmit({ name: name.trim(), email: email.trim() })
  }

  return (
    <main className="entry-shell">
      <section className="entry-copy">
        <div className="brand entry-brand"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>streakify</span></div>
        <p className="eyebrow">A gentler way to grow</p>
        <h1>Small steps.<br /><em>Steady progress.</em></h1>
        <p className="entry-description">Keep the promises you make to yourself, one simple habit at a time.</p>
        <div className="plant-drawing plant-entry" aria-hidden="true"><span className="stem" /><i /><i /><i /></div>
      </section>
      <section className="entry-panel">
        <p className="eyebrow">Welcome to your space</p>
        <h2>Let's get started</h2>
        <p className="panel-description">Enter your details to open your habit dashboard.</p>
        <form onSubmit={submit}>
          <label>Your name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Alex Morgan" autoComplete="name" /></label>
          <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="alex@example.com" autoComplete="email" /></label>
          {error && <p className="form-error">{error}</p>}
          <button className="primary-button" disabled={loading || !name.trim() || !email.trim()}>{loading ? 'Opening your space...' : <>Open my dashboard <span aria-hidden="true">→</span></>}</button>
        </form>
      </section>
    </main>
  )
}
