"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
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

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);

  return (
    <div ref={containerRef} className="relative bg-white selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <style>{shimmerStyles}</style>
      
      {/* Floating Background Elements */}
      <motion.div style={{ y: y1 }} className="fixed top-20 left-[5%] w-96 h-96 bg-blue-100/40 rounded-full blur-[120px] -z-10" />
      <motion.div style={{ y: y2 }} className="fixed bottom-20 right-[5%] w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[140px] -z-10" />

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 left-0 glass-card border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
              <span className="text-white font-bold italic">TS</span>
            </div>
            <span className="text-slate-900 font-bold text-xl tracking-tighter uppercase">Techspark</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest text-slate-500">
            <Link href="/" className="text-slate-700 hover:text-slate-900">Home</Link>
            <Link href="/careers" className="text-slate-700 hover:text-slate-900">Careers</Link>
            <Link href="/why-us" className="text-slate-700 hover:text-slate-900">Why Us</Link>
            <Link href="/about-team" className="text-slate-700 hover:text-slate-900">About</Link>
            <Link href="/sign-in" className="px-6 py-2.5 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-all shadow-xl cursor-pointer">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION: Redesigned Typography */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-6xl mx-auto">
          <h1 className="flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Small tasks.</span>
            <span className="text-8xl md:text-[14vw] font-black text-slate-900 leading-[0.75] tracking-[ -0.05em] uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-400">BIG</span>
            </span>
            <span className="text-2xl md:text-4xl font-black text-slate-400 uppercase tracking-[0.2em] mt-4">Opportunities.</span>
          </h1>
          
          <p className="mt-12 text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            TaskSpark connects motivated students with businesses that need quick, affordable help — turning everyday tasks into real experience.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link href="/post-task">
              <button className="px-12 py-6 bg-blue-600 text-white rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:bg-blue-700 hover:-translate-y-2 transition-all cursor-pointer shimmer-btn">
                Post a Task
                <div className="shimmer" />
              </button>
            </Link>
            <Link href="/sign-up-student">
              <button className="px-12 py-6 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-xl hover:bg-slate-900 hover:text-white hover:-translate-y-2 transition-all cursor-pointer">
                Join as a Student
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* LIVE STATS */}
      <section className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
          {[
            { label: "Tasks Completed", value: "14,200+", color: "text-blue-400" },
            { label: "Student Earnings", value: "$2.4M", color: "text-indigo-400" },
            { label: "Average Turnaround", value: "18hrs", color: "text-cyan-400" },
          ].map((stat, i) => (
            <div key={i} className="group cursor-default">
              <h2 className={`text-6xl font-black mb-2 ${stat.color} group-hover:scale-105 transition-transform`}>{stat.value}</h2>
              <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BENTO GRID VALUE PROPS */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-sm font-black uppercase tracking-[0.5em] text-slate-300 mb-20">The Techspark Edge</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-12 bg-blue-600 rounded-[3rem] text-white flex flex-col justify-end min-h-[400px] relative overflow-hidden group">
             <div className="relative z-10">
                <h3 className="text-5xl font-black mb-4 italic tracking-tighter leading-none">REAL WORK.<br/>REAL FAST.</h3>
                <p className="text-blue-100 text-lg max-w-sm">Average pickup time is 45 minutes. Get your project moving before your next meeting.</p>
             </div>
             <div className="absolute -right-10 -top-10 text-[20rem] font-black text-white/10 select-none">⚡</div>
          </div>
          <div className="p-12 bg-slate-50 rounded-[3rem] border border-slate-200 flex flex-col justify-between hover:border-blue-500 transition-colors cursor-default">
             <h3 className="text-2xl font-black text-slate-900">100% Vetted</h3>
             <p className="text-slate-500 font-medium">Verified student IDs and skill-testing on every profile.</p>
          </div>
          <div className="p-12 bg-indigo-50 rounded-[3rem] border border-indigo-100 flex flex-col justify-between hover:shadow-xl transition-shadow cursor-default">
             <h3 className="text-2xl font-black text-indigo-900">Secure Pay</h3>
             <p className="text-indigo-700/70 font-medium">Funds held in escrow. You only pay when you're 100% happy.</p>
          </div>
          <div className="md:col-span-2 p-12 bg-slate-900 rounded-[3rem] text-white flex items-center group cursor-default">
             <div className="grid grid-cols-2 gap-8 w-full">
                <div>
                  <h4 className="text-3xl font-black text-blue-400 mb-2">400+</h4>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Universities</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-cyan-400 mb-2">24/7</h4>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Support</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* THE BLUEPRINT TIMELINE */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-sm font-black uppercase tracking-[0.5em] text-slate-300 mb-32">The Blueprint</h2>
          <div className="space-y-40">
            <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -50 }} className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2 relative">
                <span className="text-[12rem] font-black text-slate-50 absolute -left-10 -top-20 -z-10 select-none">01</span>
                <h3 className="text-4xl font-black mb-6 italic underline decoration-blue-500 decoration-8 underline-offset-[10px]">UNBUNDLING JOBS</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">Stop hiring for "roles" and start hiring for "tasks". Get results without the overhead.</p>
              </div>
              <div className="md:w-1/2 h-64 bg-slate-900 rounded-[3rem] flex items-center justify-center text-white text-4xl font-black cursor-default">SPEED</div>
            </motion.div>
            <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 50 }} className="flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="md:w-1/2 relative">
                <span className="text-[12rem] font-black text-slate-50 absolute -right-10 -top-20 -z-10 select-none">02</span>
                <h3 className="text-4xl font-black mb-6 italic underline decoration-indigo-500 decoration-8 underline-offset-[10px]">VETTED ENERGY</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">Ambitious students ready to prove themselves. High energy, technical agility.</p>
              </div>
              <div className="md:w-1/2 h-64 bg-blue-600 rounded-[3rem] flex items-center justify-center text-white text-4xl font-black cursor-default">QUALITY</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STUDENT TESTIMONIALS */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black italic tracking-tighter mb-16">Student Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "I found my internship in under a week — the process was painless.", name: "Asha", major: "CS" },
              { text: "Companies here actually reply. I built my first product with a startup.", name: "Mateo", major: "UX" },
              { text: "Great for students who want real work experience and cash.", name: "Priya", major: "Data" },
            ].map((t, i) => (
              <div key={i} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-shadow cursor-default">
                 <p className="text-xl font-medium text-slate-700 italic mb-8">"{t.text}"</p>
                 <p className="font-black text-slate-900 text-sm">— {t.name}, {t.major}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-12 bg-white border-y border-slate-100 overflow-hidden cursor-default">
        <ScrollingText text="#1 STUDENT HIRING PLATFORM • TECHSPARK • REAL EXPERIENCE •" speed={50} />
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-900 py-40 px-6 text-center text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter">DON'T WAIT.<br />DELEGATE.</h2>
          <Link href="/sign-up-recruiter">
            <button className="px-16 py-8 bg-blue-600 rounded-3xl font-black text-2xl hover:scale-110 transition-transform cursor-pointer shadow-2xl shadow-blue-500/20">
              HIRE THE FUTURE
            </button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 text-slate-400 font-black uppercase text-[10px] tracking-widest">
          <div>© {new Date().getFullYear()} Techspark Core</div>
          <div className="flex gap-10">
            <Link href="/about" className="hover:text-blue-600 cursor-pointer">About</Link>
            <Link href="/privacy" className="hover:text-blue-600 cursor-pointer">Privacy</Link>
            <Link href="/careers" className="hover:text-blue-600 cursor-pointer">Jobs</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}