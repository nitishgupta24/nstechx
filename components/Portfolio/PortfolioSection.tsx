'use client';

import { useState, useRef, useLayoutEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Briefcase,
  ShoppingCart,
  BarChart3,
  Smartphone,
  Rocket,
  ExternalLink,
  Code2,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Web App', 'E-Commerce', 'Mobile', 'MERN'];

const projects = [
  {
    title: 'QuoteEase',
    description:
      'A smart quotation & invoice generator. Clients fill their project requirements and get an instant professional quotation + invoice — no back and forth needed.',
    icon: Briefcase,
    category: 'Web App',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'PDF Generation'],
    liveLink: '#',
    githubLink: '#',
    featured: true,
  },
  {
    title: 'GudVeda',
    description:
      'A full-featured e-commerce store for natural Indian products — Jaggery, Jaggery Powder, Desi Khand, Petha, Bhuna Chana. Clean UI with smooth shopping experience.',
    icon: ShoppingCart,
    category: 'E-Commerce',
    tech: ['React', 'Node.js', 'MongoDB', 'Razorpay'],
    liveLink: '#',
    githubLink: '#',
    featured: true,
  },
  {
    title: 'Project Alpha',
    description:
      'A full-stack MERN web application with real-time features, authentication, and dashboard analytics for business management.',
    icon: BarChart3,
    category: 'MERN',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    liveLink: '#',
    githubLink: '#',
    featured: false,
  },
  {
    title: 'Project Beta',
    description:
      'Cross-platform mobile app built with React Native. Smooth animations, offline support, and push notifications.',
    icon: Smartphone,
    category: 'Mobile',
    tech: ['React Native', 'Firebase', 'Expo'],
    liveLink: '#',
    githubLink: '#',
    featured: false,
  },
  {
    title: 'Project Gamma',
    description:
      'Modern landing page + admin dashboard for a SaaS product. Fully responsive with dark mode support.',
    icon: Rocket,
    category: 'Web App',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    liveLink: '#',
    githubLink: '#',
    featured: false,
  },
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const gridRef = useRef(null);
  const glowRef = useRef(null);
  const cardRefs = useRef({});

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  // Initial entrance animations (run once)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        x: -60,
        y: 40,
        duration: 9,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      const headerEls = headerRef.current.querySelectorAll('[data-reveal]');
      gsap.set(headerEls, { opacity: 0, y: 28 });
      gsap.to(headerEls, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
      });

      const filterBtns = filterRef.current.querySelectorAll('button');
      gsap.set(filterBtns, { opacity: 0, y: 16 });
      gsap.to(filterBtns, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: filterRef.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate grid every time the filtered list changes
  useLayoutEffect(() => {
    const cards = filtered
      .map((p) => cardRefs.current[p.title])
      .filter(Boolean);

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.08,
        clearProps: 'transform',
      }
    );
  }, [filtered]);

  const handleFilterClick = (cat) => {
    if (cat === activeCategory) return;
    const currentCards = Object.values(cardRefs.current).filter(Boolean);
    gsap.to(currentCards, {
      opacity: 0,
      y: -16,
      scale: 0.96,
      duration: 0.25,
      ease: 'power2.in',
      stagger: 0.03,
      onComplete: () => setActiveCategory(cat),
    });
  };

  const handleCardEnter = (title) => {
    const card = cardRefs.current[title];
    gsap.to(card, {
      y: -6,
      boxShadow: '0 20px 40px -14px rgba(37, 99, 235, 0.35)',
      duration: 0.35,
      ease: 'power2.out',
    });
    gsap.to(card.querySelector('[data-icon]'), {
      scale: 1.15,
      rotate: 6,
      duration: 0.4,
      ease: 'back.out(3)',
    });
  };

  const handleCardLeave = (title) => {
    const card = cardRefs.current[title];
    gsap.to(card, {
      y: 0,
      boxShadow: '0 0px 0px rgba(0,0,0,0)',
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.to(card.querySelector('[data-icon]'), {
      scale: 1,
      rotate: 0,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full bg-slate-950 py-24 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-cyan-600/5 blur-3xl rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span
            data-reveal
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 text-sm font-medium tracking-wide"
          >
            Our Work
          </span>
          <h2
            data-reveal
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Featured{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Projects
            </span>
          </h2>
          <p data-reveal className="text-gray-400 text-lg max-w-xl mx-auto">
            Real products we've built — from idea to launch.
          </p>
        </div>

        {/* Category Filter */}
        <div
          ref={filterRef}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeCategory === cat
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-800 text-gray-400 hover:text-white border border-slate-700 hover:border-slate-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.title}
                ref={(el) => (cardRefs.current[project.title] = el)}
                onMouseEnter={() => handleCardEnter(project.title)}
                onMouseLeave={() => handleCardLeave(project.title)}
                className="group bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-colors duration-300 will-change-transform"
              >
                {/* Icon header */}
                <div className="relative w-full h-48 bg-gradient-to-br from-slate-700/60 to-slate-800/60 flex items-center justify-center overflow-hidden">
                  <div
                    data-icon
                    className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/15 to-cyan-500/10 border border-blue-500/20 text-blue-400"
                  >
                    <Icon size={36} strokeWidth={1.6} />
                  </div>

                  {project.featured && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-gray-500 bg-slate-700/50 px-2 py-1 rounded-md">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs rounded-md bg-slate-700/70 text-gray-400 border border-slate-600/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href="https://quotease.probeyservices.in/"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      Live Demo
                      <ExternalLink size={14} />
                    </a>
                    <a
                      href={project.githubLink}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-600 hover:border-blue-500 text-gray-400 hover:text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      GitHub
                      <Code2 size={14} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}