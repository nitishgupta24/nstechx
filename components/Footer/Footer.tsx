'use client';

import Link from 'next/link';
import NextImage from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full bg-slate-900 border-t border-slate-800 py-16 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <NextImage src="/logo.png" alt="NSTECHX Logo" width={40} height={40} className="rounded-lg" />
              </div>
              <span className="text-white font-bold text-2xl tracking-tight">
                NS<span className="text-blue-400">TECHX</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Digital solutions that transform ideas into reality. Web, Mobile & More.
            </p>
          </motion.div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Services', href: '#services' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Team', href: '#about' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <motion.li key={link.label} whileHover={{ x: 5 }}>
                  <Link href={link.href} className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="mailto:nitishdev026@gmail.com" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                  nitishdev026@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/918755232457" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                  +91 87552 32457
                </a>
              </li>
              <li className="text-gray-400 text-sm">India — Working Worldwide 🌍</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} NSTECHX. All rights reserved.
          </p>
          <motion.p 
            whileHover={{ scale: 1.05 }}
            className="text-gray-600 text-xs"
          >
            Built with ❤️ in India
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
}