import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { personalInfo } from '../../data/resumeData'
import SectionWrapper from '../ui/SectionWrapper'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface StatusState {
  type: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: 'text-purple-400',
    bg: 'bg-purple-600/10',
    border: 'border-purple-600/30',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: personalInfo.location,
    href: '',
    color: 'text-green-400',
    bg: 'bg-green-600/10',
    border: 'border-green-600/30',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'nirmal12122004',
    href: personalInfo.github,
    color: 'text-zinc-300',
    bg: 'bg-zinc-600/10',
    border: 'border-zinc-600/30',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'connect-nirmal-patel',
    href: personalInfo.linkedin,
    color: 'text-blue-300',
    bg: 'bg-blue-600/10',
    border: 'border-blue-600/20',
  },
]

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<StatusState>({ type: 'idle', message: '' })
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email'
    if (!form.subject.trim()) newErrors.subject = 'Subject is required'
    if (!form.message.trim()) newErrors.message = 'Message is required'
    else if (form.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus({ type: 'loading', message: '' })

    // EmailJS integration - replace with your actual service/template/public key
    try {
      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: personalInfo.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStatus({ type: 'success', message: "Message sent! I'll get back to you soon." })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('EmailJS send failed:', err)
      // Fallback: open mailto
      const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`
      window.location.href = mailto
      setStatus({ type: 'success', message: 'Opening your email client to send the message.' })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const inputClasses = (field: keyof FormState) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 text-sm outline-none transition-all duration-200 focus:bg-white/8 ${
      errors[field]
        ? 'border-red-500/60 focus:border-red-400'
        : 'border-white/10 focus:border-purple-600/60'
    }`

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />

      <div className="section-container">
        <SectionWrapper className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-600/30 mb-4">
            <span className="text-xs text-purple-400 font-medium tracking-widest uppercase">Let's talk</span>
          </div>
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </SectionWrapper>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Contact info */}
          <div className="space-y-6">
            <SectionWrapper>
              <div className="card mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Let's Work Together</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  I'm currently open to internships, freelance projects, and full-time opportunities in
                  AI/ML development, software engineering, and web development. Don't hesitate to reach out!
                </p>
              </div>
            </SectionWrapper>

            <div className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, value, href, color, bg, border }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`flex items-center gap-4 p-4 rounded-xl border ${border} ${bg} hover:bg-opacity-20 transition-all group`}
                    >
                      <div className={`w-10 h-10 rounded-lg ${bg} border ${border} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={18} className={color} />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider">{label}</p>
                        <p className={`text-sm font-medium ${color} group-hover:opacity-80 transition-opacity`}>
                          {value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className={`flex items-center gap-4 p-4 rounded-xl border ${border} ${bg}`}>
                      <div className={`w-10 h-10 rounded-lg ${bg} border ${border} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={18} className={color} />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider">{label}</p>
                        <p className={`text-sm font-medium ${color}`}>{value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Contact form */}
          <SectionWrapper delay={0.2}>
            <form onSubmit={handleSubmit} className="card space-y-5" noValidate>
              <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5 uppercase tracking-wider">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClasses('name')}
                    disabled={status.type === 'loading'}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5 uppercase tracking-wider">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputClasses('email')}
                    disabled={status.type === 'loading'}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-500 mb-1.5 uppercase tracking-wider">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className={inputClasses('subject')}
                  disabled={status.type === 'loading'}
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-xs text-zinc-500 mb-1.5 uppercase tracking-wider">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  className={`${inputClasses('message')} resize-none`}
                  disabled={status.type === 'loading'}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Status message */}
              {status.type !== 'idle' && status.type !== 'loading' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 p-3 rounded-xl text-sm ${
                    status.type === 'success'
                      ? 'bg-green-600/10 border border-green-600/30 text-green-400'
                      : 'bg-red-600/10 border border-red-600/30 text-red-400'
                  }`}
                >
                  {status.type === 'success'
                    ? <CheckCircle size={16} />
                    : <AlertCircle size={16} />
                  }
                  {status.message}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full btn-primary justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={status.type !== 'loading' ? { scale: 1.01 } : {}}
                whileTap={status.type !== 'loading' ? { scale: 0.99 } : {}}
              >
                {status.type === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </SectionWrapper>
        </div>
      </div>
    </section>
  )
}
