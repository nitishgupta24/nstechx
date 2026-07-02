'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  PartyPopper,
  Send,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const infoItems = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'nitishdev026@gmail.com',
    href: 'mailto:nitishdev026@gmail.com',
  },
  {
    icon: Phone,
    label: 'Call / WhatsApp',
    value: '+91 87552 32457',
    href: 'https://wa.me/918755232457',
  },
  {
    icon: MapPin,
    label: 'Based In',
    value: 'India — Working Worldwide',
    href: null,
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const formWrapRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const infoCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const successRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Kuch galat ho gaya, dubara try karein');
      }
    } catch (err) {
      setError('Network error, dubara try karein');
    } finally {
      setSending(false);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        x: 50,
        y: -30,
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      const headerEls = headerRef.current?.querySelectorAll('[data-reveal]');
      if (headerEls) {
        gsap.set(headerEls, { opacity: 0, y: 28 });
        gsap.to(headerEls, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        });
      }

      gsap.set(infoCardRefs.current, { opacity: 0, x: -30 });
      gsap.to(infoCardRefs.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: infoRef.current, start: 'top 80%' },
      });

      const whatsappBtn = infoRef.current?.querySelector('[data-whatsapp]');
      if (whatsappBtn) {
        gsap.set(whatsappBtn, { opacity: 0, y: 20 });
        gsap.to(whatsappBtn, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: { trigger: infoRef.current, start: 'top 80%' },
        });
      }

      gsap.fromTo(
        formWrapRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: formWrapRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Success state entrance animation
  useLayoutEffect(() => {
    if (submitted && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)' }
      );
      const icon = successRef.current.querySelector('[data-success-icon]');
      if (icon) {
        gsap.fromTo(
          icon,
          { scale: 0, rotate: -30 },
          { scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(3)', delay: 0.1 }
        );
      }
    }
  }, [submitted]);

  const handleInfoEnter = (index: number) => {
    gsap.to(infoCardRefs.current[index], {
      x: 6,
      borderColor: 'rgba(59,130,246,0.5)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleInfoLeave = (index: number) => {
    gsap.to(infoCardRefs.current[index], {
      x: 0,
      borderColor: 'rgba(51,65,85,0.5)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleButtonEnter = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1.04, duration: 0.25, ease: 'power2.out' });
  };
  const handleButtonLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.25, ease: 'power2.out' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-slate-950 py-24 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-3xl rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span
            data-reveal
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wide"
          >
            Get In Touch
          </span>
          <h2
            data-reveal
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Let's Build{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Together
            </span>
          </h2>
          <p data-reveal className="text-gray-400 text-lg max-w-xl mx-auto">
            Have a project in mind? Tell us about it — we'll get back to you
            within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — Contact Info */}
          <div ref={infoRef} className="flex flex-col gap-6">
            {infoItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  ref={(el) => {
                    infoCardRefs.current[index] = el;
                  }}
                  onMouseEnter={() => handleInfoEnter(index)}
                  onMouseLeave={() => handleInfoLeave(index)}
                  className="flex items-start gap-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 will-change-transform"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-medium hover:text-blue-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* WhatsApp CTA */}
            <a
              data-whatsapp
              href="https://wa.me/918755232457?text=Hi%20NSTECHX%2C%20I%20have%20a%20project%20in%20mind!"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={handleButtonEnter}
              onMouseLeave={handleButtonLeave}
              className="flex items-center justify-center gap-3 w-full py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg shadow-green-500/20"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Right — Contact Form */}
          <div ref={formWrapRef}>
            {submitted ? (
              <div
                ref={successRef}
                className="flex flex-col items-center justify-center h-full bg-slate-800/50 border border-slate-700/50 rounded-2xl p-10 text-center"
              >
                <span
                  data-success-icon
                  className="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400"
                >
                  <PartyPopper size={30} strokeWidth={1.75} />
                </span>
                <h3 className="text-white text-2xl font-bold mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-400">
                  Thanks for reaching out! We'll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 flex flex-col gap-4"
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone + Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">
                      Service Needed
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="" className="bg-slate-800">
                        Select a service
                      </option>
                      <option value="mern" className="bg-slate-800">
                        MERN Stack Development
                      </option>
                      <option value="web" className="bg-slate-800">
                        Web Development
                      </option>
                      <option value="app" className="bg-slate-800">
                        App Development
                      </option>
                      <option value="seo" className="bg-slate-800">
                        SEO Optimization
                      </option>
                      <option value="uiux" className="bg-slate-800">
                        UI/UX Design
                      </option>
                      <option value="other" className="bg-slate-800">
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your project — what you need, timeline, budget..."
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  onMouseEnter={handleButtonEnter}
                  onMouseLeave={handleButtonLeave}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg shadow-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending...' : 'Send Message'}
                  <Send size={16} />
                </button>

                {error && (
                  <p className="text-red-400 text-xs text-center">{error}</p>
                )}

                <p className="text-gray-500 text-xs text-center">
                  We'll reply within 24 hours on email or WhatsApp.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}