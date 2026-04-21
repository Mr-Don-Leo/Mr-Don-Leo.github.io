import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    // Opens the user's mail client with the form data pre-filled
    const subject = encodeURIComponent(data.get('subject') || 'Hello from your website')
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\n\n${data.get('message')}`
    )
    window.location.href = `mailto:maksimababayan@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="page-section">
      <h1 className="section-title">Contact</h1>
      <p className="section-body" style={{ marginBottom: '0.5rem' }}>
        Have a question, idea, or just want to say hi? Send me a message.
      </p>

      <div className="contact-wrap">
        {/* ── Form ── */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="Your name"
            required
          />
          <input
            className="form-input"
            type="text"
            name="subject"
            placeholder="Subject"
          />
          <textarea
            className="form-input form-textarea"
            name="message"
            placeholder="Your message..."
            required
          />
          <button className="form-submit" type="submit">
            {sent ? 'Opening mail client…' : 'Send message'}
          </button>
        </form>

        {/* ── Direct links ── */}
        <div className="contact-info">
          <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            Or reach me directly:
          </p>
          <a
            className="contact-link"
            href="mailto:maksimababayan@gmail.com"
          >
            <span className="contact-icon">✉️</span>
            maksimababayan@gmail.com
          </a>
          <a
            className="contact-link"
            href="https://github.com/Mr-Don-Leo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-icon">🐙</span>
            github.com/Mr-Don-Leo
          </a>
        </div>
      </div>
    </div>
  )
}
