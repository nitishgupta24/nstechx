'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Zap,
  Globe,
  Smartphone,
  Search,
  Palette,
  Cloud,
  ArrowUpRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Zap,
    title: 'MERN Stack Development',
    description:
      'Full-stack web apps built with MongoDB, Express, React & Node.js. Fast, scalable, and production-ready.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
  },
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Custom websites and web apps — from landing pages to complex platforms. Clean code, fast load times.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description:
      'Cross-platform mobile apps for iOS & Android. Built with React Native for a native feel at lower cost.',
    tags: ['React Native', 'iOS', 'Android'],
  },
  {
    icon: Search,
    title: 'SEO Optimization',
    description:
      'On-page SEO, technical audits, and performance optimization to rank higher and get more organic traffic.',
    tags: ['On-Page SEO', 'Core Web Vitals', 'Technical Audit'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Clean, modern interfaces that users love. Figma designs tailored to your brand before a single line of code.',
    tags: ['Figma', 'Wireframing', 'Prototyping'],
  },
  {
    icon: Cloud,
    title: 'Deployment & Maintenance',
    description:
      'We deploy, monitor, and maintain your product. Vercel, AWS, or your preferred platform — we handle it.',
    tags: ['Vercel', 'AWS', 'CI/CD'],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);
  const glowRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Ambient background glow drift
      gsap.to(glowRef.current, {
        x: 80,
        y: 30,
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Header eyebrow / heading / subtext reveal
      const headerEls = headerRef.current.querySelectorAll('[data-reveal]');
      gsap.set(headerEls, { opacity: 0, y: 28 });
      gsap.to(headerEls, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
      });

      // Cards: staggered 3D reveal
      gsap.set(cardRefs.current, {
        opacity: 0,
        y: 60,
        rotateX: -12,
        transformPerspective: 800,
        transformOrigin: 'top center',
      });
      gsap.to(cardRefs.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 78%',
        },
      });

      // Icon pop-in per card (slight delay after card)
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const icon = card.querySelector('[data-icon-box]');
        gsap.fromTo(
          icon,
          { scale: 0.4, opacity: 0, rotate: -15 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.6,
            ease: 'back.out(2.2)',
            scrollTrigger: {
              trigger: card,
              start: 'top 78%',
            },
          }
        );
      });

      // CTA reveal
      const ctaEls = ctaRef.current.querySelectorAll('[data-reveal]');
      gsap.set(ctaEls, { opacity: 0, y: 20 });
      gsap.to(ctaEls, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 90%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardEnter = (e, index) => {
    const card = cardRefs.current[index];
    gsap.to(card, {
      y: -8,
      scale: 1.02,
      duration: 0.35,
      ease: 'power2.out',
      boxShadow: '0 20px 40px -12px rgba(37, 99, 235, 0.35)',
    });
    gsap.to(card.querySelector('[data-icon-box]'), {
      rotate: 8,
      scale: 1.12,
      duration: 0.4,
      ease: 'back.out(3)',
    });
  };

  const handleCardLeave = (index) => {
    const card = cardRefs.current[index];
    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
      boxShadow: '0 0px 0px rgba(0,0,0,0)',
    });
    gsap.to(card.querySelector('[data-icon-box]'), {
      rotate: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  // Subtle magnetic tilt following cursor
  const handleCardMove = (e, index) => {
    const card = cardRefs.current[index];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(card, {
      rotateY: (x / rect.width) * 8,
      rotateX: -(y / rect.height) * 8,
      transformPerspective: 600,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-slate-900 py-24 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-3xl rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span
            data-reveal
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wide"
          >
            What We Do
          </span>
          <h2
            data-reveal
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Services
            </span>
          </h2>
          <p data-reveal className="text-gray-400 text-lg max-w-xl mx-auto">
            End-to-end digital solutions — from design to deployment. We build
            what your business needs.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: 1000 }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseEnter={(e) => handleCardEnter(e, index)}
                onMouseMove={(e) => handleCardMove(e, index)}
                onMouseLeave={() => handleCardLeave(index)}
                className="group relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 hover:bg-slate-800 transition-colors duration-300 cursor-default will-change-transform"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Icon */}
                <div
                  data-icon-box
                  className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/10 border border-blue-500/20 text-blue-400"
                >
                  <Icon size={22} strokeWidth={1.75} />
                </div>

                {/* Title */}
                <h3 className="flex items-center gap-1.5 text-white font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors duration-200">
                  {service.title}
                  <ArrowUpRight
                    size={16}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-400"
                  />
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-md bg-slate-700/70 text-gray-400 border border-slate-600/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div ref={ctaRef} className="text-center mt-14">
          <p data-reveal className="text-gray-400 mb-4">
            Need something custom?
          </p>
          <a href="#contact" data-reveal className="inline-block">
            <button
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  scale: 1.06,
                  duration: 0.3,
                  ease: 'power2.out',
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.3,
                  ease: 'power2.out',
                })
              }
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg shadow-blue-500/30"
            >
              Let's Talk
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}