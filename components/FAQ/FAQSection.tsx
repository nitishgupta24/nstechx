'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// सीधे यहाँ सभी FAQs का data
const faqs = [
  {
    id: 'faq-1',
    question: 'How long does it take to build a website?',
    answer: 'Usually a good website takes 4-8 weeks to develop. It depends on the project complexity and features. If you need advanced features like payment gateways or complex dashboards, it might take a bit longer. We provide a detailed timeline during the initial consultation.'
  },
  {
    id: 'faq-2',
    question: 'What is the cost of building a website?',
    answer: 'Website pricing depends on features and design complexity. A basic website starts from ₹20,000. If you need advanced features like e-commerce, booking system, or custom integrations, the cost will be higher. We offer free consultation to discuss your budget and requirements.'
  },
  {
    id: 'faq-3',
    question: 'Do you provide support after launching the website?',
    answer: 'Yes, absolutely! We provide free support for 3 months after launch. This includes bug fixes, minor updates, and performance optimization. After that, you can choose our maintenance packages starting from ₹5,000/month for ongoing support and updates.'
  },
  {
    id: 'faq-4',
    question: 'What technologies do you use for development?',
    answer: 'We use modern and latest technologies including Next.js, React, Node.js, TypeScript, Tailwind CSS, MongoDB, PostgreSQL, AWS, and more. We choose the best technology stack based on your project requirements and goals.'
  },
  {
    id: 'faq-5',
    question: 'Can you help with existing websites or apps?',
    answer: 'Yes! We provide services for existing projects too. This includes debugging, performance optimization, adding new features, migrating to new platforms, and code refactoring. We also offer code reviews and technical consulting for your team.'
  },
  {
    id: 'faq-6',
    question: 'Do you offer mobile app development?',
    answer: 'Yes, we develop mobile applications using React Native for cross-platform development (iOS and Android). We can also help with native development or progressive web apps (PWA) depending on your needs.'
  },
  {
    id: 'faq-7',
    question: 'What about website hosting and maintenance?',
    answer: 'We handle everything including domain setup, SSL certificates, hosting configuration, regular backups, security updates, and performance monitoring. Our maintenance packages include automatic backups, monthly updates, and 24/7 support.'
  },
  {
    id: 'faq-8',
    question: 'Do you provide SEO services?',
    answer: 'We build all websites with SEO best practices in mind, including proper meta tags, sitemap, structured data, and performance optimization. For advanced SEO services like link building and content strategy, we can partner with SEO specialists.'
  },
  {
    id: 'faq-9',
    question: 'Can you help with deployment and DevOps?',
    answer: 'Yes! We handle deployment on platforms like Vercel, AWS, DigitalOcean, Heroku, and more. We also set up CI/CD pipelines for automated deployments, ensuring smooth and reliable releases every time.'
  },
  {
    id: 'faq-10',
    question: 'What is your process for starting a new project?',
    answer: 'Our process includes: 1) Free consultation to understand requirements, 2) Project proposal with timeline and pricing, 3) Design mockups for approval, 4) Development phase with regular updates, 5) Testing and QA, 6) Launch and deployment, 7) Training and handover.'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="py-20 px-4 bg-slate-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5"
          style={{
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading with Stagger Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Everything you need to know about our services
          </motion.p>
        </motion.div>

        {/* FAQ Items Container */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.2 }}
        >
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              {/* Question Button */}
              <motion.button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:text-cyan-400 transition-colors duration-300 group"
                whileHover={{ backgroundColor: 'rgba(30, 41, 59, 0.8)' }}
              >
                <h3 className="font-semibold text-white text-lg text-left group-hover:text-cyan-400 transition-colors duration-300">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
                  }}
                  className="ml-4 flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6 text-cyan-400 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </motion.div>
              </motion.button>

              {/* Answer */}
              <AnimatePresence mode="wait">
                {openId === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut',
                    }}
                  >
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: 0.1,
                      }}
                      className="px-6 py-4 bg-slate-800/30 border-t border-slate-700/50"
                    >
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section with Hover Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
          }}
          className="mt-12 p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg text-center transition-all duration-300"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-white mb-2"
          >
            Still have questions?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 mb-6"
          >
            Can't find what you're looking for? Reach out to our team directly.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a href="/contact">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(0, 212, 255, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Contact Us
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}