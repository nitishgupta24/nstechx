'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    // 'h-screen' ki jagah 'min-h-screen' aur 'py-20' tak ki padding add ki
    <section className="relative w-full flex items-center justify-center py-30 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

      {/* Background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 dark:bg-blue-500 rounded-full blur-3xl animate-pulse opacity-10 dark:opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400 dark:bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000 opacity-10 dark:opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-block mb-6 px-4 py-1 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-500 dark:text-blue-400 text-xs md:text-sm font-medium"
          >
            🚀 Web & Mobile Development Agency
          </motion.div>

          {/* Heading - Mobile pe text size kam kiya */}
          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            NSTECHX
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-2xl text-slate-700 dark:text-gray-300 mb-4"
          >
            Digital Solutions That Transform Ideas Into Reality
          </motion.p>

          {/* Supporting line - Mobile pe margin kam kiya */}
          <motion.p
            className="text-sm md:text-base text-slate-500 dark:text-gray-500 mb-8 max-w-xl mx-auto"
          >
            We build fast, scalable, and modern web & mobile apps for startups and businesses.
          </motion.p>

          {/* CTA Buttons - Mobile pe gap kam kiya */}
          <motion.div
            className="flex gap-3 justify-center flex-wrap"
          >
            <Link href="#portfolio">
              <button className="px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:scale-105 transition-all">
                View Our Work
              </button>
            </Link>
            <Link href="#contact">
              <button className="px-6 py-2.5 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                Get In Touch
              </button>
            </Link>
          </motion.div>

          {/* Stats Row - Mobile pe gap aur text size adjust kiya */}
          <motion.div
            className="grid grid-cols-3 gap-4 mt-12 text-center"
          >
            {[
              { value: '10+', label: 'Projects' },
              { value: '100%', label: 'Happy' },
              { value: '2+', label: 'Years' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-lg md:text-2xl font-bold text-blue-500">{stat.value}</p>
                <p className="text-[10px] md:text-xs text-slate-500 uppercase">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
         {/* ... scroll icon ... */}
      </motion.div>
    </section>
  );
}