import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="section-hero">
      {/* Subtle background glow blobs */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '15%', left: '20%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '15%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217,70,239,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      <h1 className="hero-title">Hey, I'm Don Leo.</h1>
      <p className="hero-sub">
        Developer, creator, and tinkerer. This is where I showcase my projects,
        experiments, and whatever fun stuff I build along the way.
      </p>
      <Link to="/contact" className="hero-btn">Get in touch →</Link>
    </section>
  )
}
