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

export default function WhyUs() {
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

      {/* Navigation Bar */}
<<<<<<< HEAD
      <nav className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-white">
                Taskspark
              </Link>
            </div>
            <div className="flex space-x-8">
              <Link href="/careers" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Careers
              </Link>
              <Link href="/about-team" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                About the Team
              </Link>
              <Link href="/why-us" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Why Us?
              </Link>
=======
      <nav className="fixed w-full z-50 top-0 left-0 glass-card border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
              <span className="text-white font-bold italic">TS</span>
>>>>>>> origin/test
            </div>
            <span className="text-slate-900 font-bold text-xl tracking-tighter uppercase">TaskSpark</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors cursor-pointer">Home</Link>
            <Link href="/careers" className="hover:text-blue-600 transition-colors cursor-pointer">Careers</Link>
            <Link href="/why-us" className="text-blue-600 transition-colors cursor-pointer">Why Us</Link>
            <Link href="/about-team" className="hover:text-blue-600 transition-colors cursor-pointer">About</Link>
            <Link href="/sign-in" className="px-6 py-2.5 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-all shadow-xl cursor-pointer">Sign in</Link>
          </div>
        </div>
      </nav>

<<<<<<< HEAD
      {/* Page Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Why Choose Taskspark?</h1>
        <p className="text-xl text-gray-300 text-center mb-12">
          Discover what makes us the premier platform for student hiring.
        </p>

        <div className="space-y-12">
          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">🎯 Smart Matching Technology</h2>
            <p className="text-gray-300">
              Our AI-powered matching system connects students with opportunities that perfectly
              align with their skills, interests, and career goals. No more endless scrolling
              through irrelevant job postings.
            </p>
=======
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="flex flex-col items-center">
            <span className="text-2xl md:text-4xl font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Discover</span>
            <span className="text-7xl md:text-[12vw] font-black text-slate-900 leading-[0.75] tracking-[-0.05em] uppercase">
              WHY <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-500">US?</span>
            </span>
          </h1>
          <p className="mt-12 text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            We aren't just another job board. Discover what makes TaskSpark the premier ecosystem for the next generation of builders.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link href="/sign-up-student">
              <button className="px-12 py-6 bg-blue-600 text-white rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:bg-blue-700 hover:-translate-y-2 transition-all cursor-pointer shimmer-btn">
                Start Building
                <div className="shimmer" />
              </button>
            </Link>
>>>>>>> origin/test
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6">
        {/* What Sets Us Apart - Bento Grid */}
        <section className="py-20">
          <h2 className="text-center text-sm font-black uppercase tracking-[0.5em] text-slate-300 mb-20">What Sets Us Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* AI Card */}
            <div className="md:col-span-2 p-12 bg-slate-900 rounded-[3rem] text-white flex flex-col justify-between min-h-[400px] relative overflow-hidden group cursor-default">
              <div className="relative z-10">
                <span className="text-4xl mb-6 block">🎯</span>
                <h3 className="text-4xl font-black mb-4 italic tracking-tighter">SMART MATCHING TECHNOLOGY</h3>
                <p className="text-slate-400 text-lg max-w-md font-medium">Our AI-powered system doesn't just scan keywords. It connects students with opportunities that fit their specific technical skills, creative interests, and long-term career goals.</p>
              </div>
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] group-hover:bg-blue-600/40 transition-all" />
            </div>

            {/* Fast Applications Card */}
            <div className="p-12 bg-blue-50 rounded-[3rem] border border-blue-100 flex flex-col justify-center hover:shadow-xl transition-all cursor-default">
              <span className="text-4xl mb-6 block">🚀</span>
              <h3 className="text-2xl font-black text-blue-900 mb-4 uppercase">Fast & Easy</h3>
              <p className="text-blue-700/70 font-medium">Apply to multiple opportunities with a single verified profile. No more repetitive forms.</p>
            </div>

            {/* Verified Card */}
            <div className="p-12 bg-indigo-600 rounded-[3rem] text-white flex flex-col justify-center hover:scale-[1.02] transition-transform cursor-default">
              <span className="text-4xl mb-6 block">✅</span>
              <h3 className="text-2xl font-black mb-4 uppercase">Verified Only</h3>
              <p className="text-indigo-100 font-medium">Every posting is manually vetted. Only quality roles from reputable companies make the cut.</p>
            </div>

            {/* Scale/Impact Card */}
            <div className="md:col-span-2 p-12 bg-slate-50 rounded-[3rem] border border-slate-200 flex items-center group cursor-default">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                <div>
                  <h4 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">98%</h4>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Student Satisfaction</p>
                </div>
                <div>
                  <h4 className="text-5xl font-black text-blue-600 mb-2 tracking-tighter">24hr</h4>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Average Response Time</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Ready to get started section */}
        <section className="py-32 text-center">
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-12">READY TO GET STARTED?</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/sign-up-student">
              <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 hover:scale-105 transition-all cursor-pointer shadow-lg shadow-blue-200">
                Join as a Student
              </button>
            </Link>
            <Link href="/sign-up-recruiter">
              <button className="px-10 py-5 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-900 hover:text-white hover:scale-105 transition-all cursor-pointer">
                Hire Students
              </button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 border-t border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-slate-400 font-black uppercase text-[10px] tracking-widest">
            <div>© {new Date().getFullYear()} TaskSpark Core</div>
            <div className="flex gap-10">
              <Link href="/about-team" className="hover:text-blue-600 cursor-pointer transition-colors">About</Link>
              <Link href="/why-us" className="hover:text-blue-600 cursor-pointer transition-colors">Privacy</Link>
              <Link href="/careers" className="hover:text-blue-600 cursor-pointer transition-colors">Jobs</Link>
            </div>
          </div>
        </footer>

        <div className="mt-12 mb-12">
          <ScrollingText text="THE SMART WAY TO HIRE • THE SMART WAY TO WORK • TASKSPARK •" speed={50} />
        </div>
      </main>
    </div>
  );
}