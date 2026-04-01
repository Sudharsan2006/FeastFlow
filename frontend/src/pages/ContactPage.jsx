import { useState } from 'react'
import toast from 'react-hot-toast'
import { Send } from 'lucide-react'
import { submitContact } from '../api'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' })
  const [sending, setSending] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)
    try {
      const { data } = await submitContact({
        name:    form.name,
        email:   form.email,
        phone:   form.phone    || null,
        subject: form.subject  || null,
        message: form.message,
      })
      toast.success(
        `✅ Message received #${data.id}! We'll reply to ${data.email} soon 🙌`,
        { duration: 6000 }
      )
      setForm({ name:'', email:'', phone:'', subject:'', message:'' })
    } catch (err) {
      const details = err.response?.data?.details
      if (details) {
        Object.values(details).forEach(m => toast.error(m))
      } else {
        toast.error(err.response?.data?.message || 'Failed to send. Please try again.')
      }
    } finally {
      setSending(false)
    }
  }

  const contacts = [
    { icon:'📍', label:'Address',       val: '42 Culinary Lane, Food Street, Chennai - 600001' },
    { icon:'📞', label:'Phone',         val: '+91 98765 43210' },
    { icon:'✉️', label:'Email',         val: 'hello@feastflow.in' },
    { icon:'🕐', label:'Working Hours', val: 'Mon–Sun: 9:00 AM – 11:00 PM' },
  ]

  return (
    <div>
      {/* Banner */}
      <div style={{
        position:'relative', height:280, overflow:'hidden',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
          alt="restaurant"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.3)' }}
        />
        <div style={{ position:'relative', zIndex:1, textAlign:'center' }}>
          <div className="section-eyebrow" style={{textAlign:'center', marginBottom:8}}>Get In Touch</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:800 }}>
            Contact Us
          </h1>
          <p style={{ color:'var(--text2)', marginTop:8, fontSize:'1rem' }}>
            We'd love to hear from you. Reach out anytime!
          </p>
        </div>
      </div>

      <section className="contact-section">
        <div className="contact-inner">
          {/* Left Info */}
          <div className="contact-info">
            <div>
              <div className="contact-eyebrow">FeastFlow Restaurant</div>
              <h2 className="contact-title">Let's Start a Conversation</h2>
              <p className="contact-desc">
                Have a question about our menu, want to make a reservation, or just want to say hello?
                Our team is here 7 days a week to assist you with anything you need.
              </p>
            </div>

            <div className="contact-items">
              {contacts.map((c,i) => (
                <div className="contact-item" key={i}>
                  <div className="contact-item-icon">{c.icon}</div>
                  <div className="contact-item-body">
                    <div className="contact-item-label">{c.label}</div>
                    <div className="contact-item-val">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map embed placeholder */}
            <div style={{
              borderRadius:'var(--r-lg)', overflow:'hidden',
              border:'1px solid var(--border)', height:200,
              background:'var(--bg3)', position:'relative',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <img
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80"
                alt="map"
                style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.3 }}
              />
              <div style={{ position:'relative', zIndex:1, textAlign:'center' }}>
                <div style={{ fontSize:'2rem', marginBottom:6 }}>📍</div>
                <div style={{ fontWeight:700, fontSize:'0.9rem' }}>42 Culinary Lane, Chennai</div>
                <div style={{ color:'var(--text2)', fontSize:'0.8rem', marginTop:3 }}>Click to open in Maps</div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <div style={{ fontSize:'0.78rem', color:'var(--text3)', marginBottom:12, fontWeight:600, letterSpacing:1, textTransform:'uppercase' }}>Follow Us</div>
              <div style={{ display:'flex', gap:10 }}>
                {['Instagram', 'Facebook', 'Twitter', 'YouTube'].map(s => (
                  <button key={s} className="btn btn-ghost btn-sm" style={{ fontSize:'0.78rem' }}>
                    {s === 'Instagram' ? '📸' : s === 'Facebook' ? '👍' : s === 'Twitter' ? '🐦' : '▶️'} {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="contact-form-box">
            <h3 className="contact-form-title">Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input className="form-control" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="form-control" name="subject" value={form.subject} onChange={handleChange}>
                  <option value="">Select a topic...</option>
                  <option>General Inquiry</option>
                  <option>Table Reservation</option>
                  <option>Feedback</option>
                  <option>Catering Services</option>
                  <option>Complaint</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea className="form-control" name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help you..." required />
              </div>
              <button className="btn btn-primary" style={{ width:'100%', padding:'13px', fontSize:'1rem', borderRadius:'var(--r-md)', marginTop:4 }} type="submit" disabled={sending}>
                <Send size={16}/>
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
