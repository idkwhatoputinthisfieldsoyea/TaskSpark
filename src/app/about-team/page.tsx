"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollingText from "@/components/ScrollingText";

const shimmerStyles = `
  .shimmer-btn { position: relative; overflow: hidden; cursor: pointer; }
  .shimmer {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none;
    background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%);
    transform: translateX(-100%);
    animation: shimmer 1.2s ease-in-out infinite;
  }
  @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
  .glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

export default function AboutTeam() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const team = [
    { name: "Aydin Rizzqi", role: "CEO & Founder", initials: "AR", color: "from-blue-500 to-indigo-600", bio: "Leading the vision and strategy for TaskSpark's future." },
    { name: "Pranav Singh", role: "CTO", initials: "PS", color: "from-cyan-500 to-blue-600", bio: "Driving technical innovation and platform development." },
    { name: "Pranav Singh", role: "Head of Design", initials: "PS", color: "from-indigo-500 to-purple-600", bio: "Crafting beautiful and intuitive user experiences." },
  ];

  return (
      <div ref={containerRef} className="relative selection:bg-blue-600 selection:text-white overflow-x-hidden bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/40">
        <style>{shimmerStyles}</style>

        {/* Animated Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Parallax Gradient Orbs */}
          <motion.div 
            style={{ y: y1 }} 
            className="absolute top-20 left-[5%] w-[450px] h-[450px] bg-gradient-to-br from-blue-400/20 to-cyan-300/20 rounded-full blur-[100px]" 
          />
          <motion.div 
            style={{ y: y2 }} 
            className="absolute bottom-20 right-[5%] w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/15 to-indigo-300/20 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-200/10 to-cyan-200/10 rounded-full blur-[130px]" 
          />
          
          {/* Hexagon Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:45px_45px]" />
          
          {/* Floating Decorative Shapes */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute top-[15%] right-[18%] w-24 h-24 border border-cyan-200/30 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -180, y: [0, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[40%] left-[8%] w-16 h-16 border-2 border-blue-200/20 rounded-2xl"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[45%] right-[8%] w-10 h-10 bg-gradient-to-br from-cyan-400/15 to-blue-400/15 rounded-lg"
          />
          
          {/* Rising Bubbles */}
          <motion.div 
            animate={{ y: [0, -130], opacity: [0, 0.5, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeOut" }}
            className="absolute bottom-0 left-[20%] w-3 h-3 bg-cyan-400/40 rounded-full"
          />
          <motion.div 
            animate={{ y: [0, -150], opacity: [0, 0.4, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeOut", delay: 1 }}
            className="absolute bottom-0 left-[55%] w-2 h-2 bg-blue-400/50 rounded-full"
          />
          <motion.div 
            animate={{ y: [0, -110], opacity: [0, 0.6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 2 }}
            className="absolute bottom-0 right-[25%] w-2.5 h-2.5 bg-indigo-400/40 rounded-full"
          />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300 ease-out">
              <span className="text-white font-bold italic">TS</span>
            </div>
            <span className="text-slate-900 font-bold text-xl tracking-tighter uppercase">TaskSpark</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors cursor-pointer">Home</Link>
            <Link href="/careers" className="hover:text-blue-600 transition-colors cursor-pointer">Careers</Link>
            <Link href="/why-us" className="hover:text-blue-600 transition-colors cursor-pointer">Why Us</Link>
            <Link href="/about-team" className="text-blue-600 transition-colors cursor-pointer">About</Link>
            <Link href="/sign-in" className="px-6 py-2.5 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-all shadow-xl cursor-pointer">Sign in</Link>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 pb-24 pt-32">
        <section className="py-24">
          <h2 className="text-center text-sm font-black uppercase tracking-[0.5em] text-slate-300 mb-20">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="p-10 glass-card rounded-[3rem] border border-slate-200 text-center hover:shadow-2xl hover:border-blue-300 transition-all group cursor-default"
              >
                <div className={`w-32 h-32 bg-gradient-to-br ${member.color} rounded-full mx-auto mb-8 flex items-center justify-center text-white text-3xl font-black shadow-xl group-hover:scale-110 transition-transform`}>
                  {member.initials}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase italic tracking-tighter">{member.name}</h3>
                <p className="text-blue-600 font-black uppercase text-[10px] tracking-widest mb-4">{member.role}</p>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission / Content Section */}
        <section className="py-32 bg-slate-900 rounded-[4rem] px-12 relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 italic tracking-tighter uppercase">Our Mission</h2>
            <p className="text-xl text-slate-400 font-medium leading-relaxed mb-12">
              We're a passionate team led by Aydin Rizzqi, with Pranav Singh driving our technical vision
              and design excellence. Together, we're building the future of student hiring, connecting
              talented individuals with meaningful career opportunities.
            </p>
            <div className="flex justify-center">
              <Link href="/careers">
                <button className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black hover:scale-105 transition-transform cursor-pointer shadow-xl shadow-blue-500/20">
                  JOIN OUR MISSION
                </button>
              </Link>
            </div>
          </div>
          {/* Decorative Background Element */}
          <div className="absolute -right-20 -bottom-20 text-[20rem] font-black text-white/5 select-none pointer-events-none uppercase">Impact</div>
        </section>

        {/* Core Values / Added Content */}
        <section className="py-32">
          <h2 className="text-center text-sm font-black uppercase tracking-[0.5em] text-slate-300 mb-20">Our DNA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-12 bg-blue-50 rounded-[3rem] border border-blue-100 flex flex-col justify-between cursor-default">
              <h4 className="text-2xl font-black text-blue-900 uppercase italic">Radical Transparency</h4>
              <p className="text-blue-700/70 font-medium mt-4">We believe in open feedback loops and clear communication across every level of the platform.</p>
            </div>
            <div className="p-12 bg-slate-50 rounded-[3rem] border border-slate-200 flex flex-col justify-between cursor-default">
              <h4 className="text-2xl font-black text-slate-900 uppercase italic">Student First</h4>
              <p className="text-slate-500 font-medium mt-4">Every feature we build is designed to empower the student and protect their professional growth.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 border-t border-slate-100 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-slate-400 font-black uppercase text-[10px] tracking-widest">
            <div>© {new Date().getFullYear()} TaskSpark Core</div>
            <div className="flex gap-10">
              <Link href="/about-team" className="hover:text-blue-600 cursor-pointer transition-colors">About</Link>
              <Link href="/why-us" className="hover:text-blue-600 cursor-pointer transition-colors">Privacy</Link>
              <Link href="/careers" className="hover:text-blue-600 cursor-pointer transition-colors">Jobs</Link>
            </div>
          </div>
        </footer>

        <div className="mt-12">
          <ScrollingText text="MEET THE BUILDERS • TASKSPARK • DESIGNING THE FUTURE •" speed={45} />
        </div>
      </main>
    </div>
  );
}