export default function Features() {
  return (
    <div className="page-section">
      <h1 className="section-title">Features</h1>
      <p className="section-body">
        This is where your features and projects will live. Add entries to the{' '}
        <code style={{ background: 'rgba(168,85,247,0.15)', padding: '2px 6px', borderRadius: 4, fontSize: '0.9em', color: 'var(--accent)' }}>
          FEATURES_ITEMS
        </code>{' '}
        array in <code style={{ background: 'rgba(168,85,247,0.15)', padding: '2px 6px', borderRadius: 4, fontSize: '0.9em', color: 'var(--accent)' }}>
          Navbar.jsx
        </code>{' '}
        to populate the dropdown.
      </p>

      <div className="card-grid" style={{ marginTop: '2.5rem' }}>
        {/* Placeholder card — replace these with real projects */}
        <div className="card">
          <div className="card-title">Coming soon</div>
          <div className="card-desc">Your first feature will appear here.</div>
        </div>
      </div>
    </div>
  )
}
