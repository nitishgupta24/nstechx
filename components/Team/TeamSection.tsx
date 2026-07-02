'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const teamData = [
  { 
    id: 1, 
    name: "Nitish Gupta", 
    role: "Founder & Lead Dev", 
    img: "/team/nitish.png", // Yahan apni image ka path change karein
    bio: "With 2+ years of experience, I’ve led numerous freelance projects.", 
    tech: ["Next.js", "React", "Nodejs"] 
  },
  { 
    id: 2, 
    name: "Sourav Kumar", 
    role: "Project Manager", 
    img: "/team/sourav.jpeg", // Yahan apni image ka path change karein
    bio: "Specializing in pixel-perfect, responsive web interfaces.", 
    tech: ["React", "Python", "PHP"] 
  },
  { 
    id: 3, 
    name: "Tushar", 
    role: "Application Developer", 
    img: "/team/tushar.png", // Yahan apni image ka path change karein
    bio: "Passionate about creating intuitive user journeys.", 
    tech: ["Java", "flutter", "dart"] 
  },
  
  { 
    id: 4, 
    name: "Anshul", 
    role: "seo specialist", 
    img: "/team/anshul.png", // Yahan apni image ka path change karein
    bio: "Ensuring seamless delivery and client vision.", 
    tech: ["SEO", "Performance Marketer"] 
  }
];

export default function TeamSection() {
  const [index, setIndex] = useState(0);

  return (
    <section className="bg-[#050505] text-white py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Left: Image & Circle Animation */}
        <div className="relative flex-shrink-0 w-72 h-72 flex items-center justify-center">
          <motion.div 
            key={index}
            initial={{ rotate: 0 }}
            animate={{ rotate: 180 }} 
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 border-t-4 border-blue-500 rounded-full" 
          />
          
          <div className="w-60 h-60 rounded-full overflow-hidden border-2 border-white/10 relative">
            <Image 
              src={teamData[index].img} 
              alt={teamData[index].name} 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 240px"
              priority
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }} 
              className="space-y-6"
            >
              <h2 className="text-5xl font-bold">{teamData[index].name}</h2>
              <p className="text-blue-400 text-xl font-medium">{teamData[index].role}</p>
              <p className="text-gray-400 leading-relaxed">{teamData[index].bio}</p>
              
              <button 
                onClick={() => setIndex((prev) => (prev + 1) % teamData.length)}
                className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                Next Member →
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}