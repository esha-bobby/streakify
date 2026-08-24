export default function Header({ user, onSignOut }) {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Streakify home">
        <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
        <span>streakify</span>
      </a>
      <div className="topbar-actions">
        <span className="user-name">{user.name}</span>
        <button className="text-button" onClick={onSignOut}>Switch user</button>
      </div>
    </header>
  )
}
