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

export default function Careers() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
      <div ref={containerRef} className="relative selection:bg-blue-600 selection:text-white overflow-x-hidden bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/40">
        <style>{shimmerStyles}</style>

        {/* Animated Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Parallax Gradient Orbs */}
          <motion.div 
            style={{ y: y1 }} 
            className="absolute top-20 left-[5%] w-[450px] h-[450px] bg-gradient-to-br from-blue-400/25 to-indigo-300/20 rounded-full blur-[100px]" 
          />
          <motion.div 
            style={{ y: y2 }} 
            className="absolute bottom-20 right-[5%] w-[550px] h-[550px] bg-gradient-to-br from-indigo-400/20 to-cyan-300/15 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-purple-200/15 to-blue-200/10 rounded-full blur-[120px]" 
          />
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          {/* Decorative Elements */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] right-[15%] w-24 h-24 border border-indigo-200/30 rounded-2xl"
          />
          <motion.div 
            animate={{ rotate: -360, y: [0, -15, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[30%] left-[10%] w-16 h-16 border border-blue-200/25 rounded-full"
          />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
              <span className="text-white font-bold italic">TS</span>
            </div>
            <span className="text-slate-900 font-bold text-xl tracking-tighter uppercase">TaskSpark</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors cursor-pointer">Home</Link>
            <Link href="/careers" className="text-blue-600 transition-colors cursor-pointer">Careers</Link>
            <Link href="/why-us" className="hover:text-blue-600 transition-colors cursor-pointer">Why Us</Link>
            <Link href="/about-team" className="hover:text-blue-600 transition-colors cursor-pointer">About</Link>
            <Link href="/sign-in" className="px-6 py-2.5 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-all shadow-xl cursor-pointer">Sign in</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-2xl md:text-4xl font-black text-slate-400 uppercase tracking-[0.2em] mb-4"
            >
              Careers at
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-7xl md:text-[10vw] font-black text-slate-900 leading-[0.8] tracking-[-0.05em] uppercase"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-400">TaskSpark</span>
            </motion.span>
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-12 text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Join our mission to connect students with real opportunities. Explore open roles and help shape the future of youth talent.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            <Link href="/sign-up-recruiter">
              <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-2xl hover:bg-blue-700 hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer shimmer-btn">
                Post a Job
                <div className="shimmer" />
              </button>
            </Link>
            <Link 
              href="/sign-up-student"
              className="px-10 py-5 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-900 hover:text-white hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer inline-block"
            >
              Join as a Student
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        {/* Open Positions Section - Bento Style Cards */}
        <section className="py-20">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-black tracking-tighter italic">Open Positions</h2>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-2">Find your next big break</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 glass-card rounded-[3rem] border border-slate-200 hover:border-blue-400 transition-all group cursor-default"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="px-4 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-full">Remote · Paid</span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Frontend Developer Intern</h3>
              <p className="text-slate-600 font-medium mb-8">Work with React and Tailwind to build beautiful UIs for the next generation of talent tools.</p>
              <Link href="/sign-up-student">
                <button className="text-blue-600 font-black tracking-widest uppercase text-sm hover:translate-x-2 transition-transform flex items-center gap-2 cursor-pointer">
                  Apply Now <span>→</span>
                </button>
              </Link>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 bg-slate-900 rounded-[3rem] border border-slate-800 text-white transition-all group cursor-default"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="px-4 py-1 bg-slate-800 text-cyan-400 text-[10px] font-black uppercase rounded-full">Hybrid · Stipend</span>
              </div>
              <h3 className="text-3xl font-black mb-4 group-hover:text-cyan-400 transition-colors">Data Science Project</h3>
              <p className="text-slate-400 font-medium mb-8">Analyze real-world data and deliver insights for clients using modern ML frameworks.</p>
              <Link href="/sign-up-student">
                <button className="text-cyan-400 font-black tracking-widest uppercase text-sm hover:translate-x-2 transition-transform flex items-center gap-2 cursor-pointer">
                  Apply Now <span>→</span>
                </button>
              </Link>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/sign-up-student">
              <button className="px-12 py-5 bg-slate-50 border border-slate-200 text-slate-900 rounded-full font-black hover:bg-white hover:shadow-xl transition-all cursor-pointer">
                See all roles
              </button>
            </Link>
          </div>
        </section>

        {/* Why work at TaskSpark? - Bento Style Props */}
        <section className="py-24">
          <h2 className="text-center text-sm font-black uppercase tracking-[0.5em] text-slate-300 mb-20">The Why</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-12 bg-slate-50 rounded-[3rem] border border-slate-100 hover:border-blue-500 transition-colors group cursor-default">
              <div className="text-3xl mb-4 group-hover:animate-bounce">🌍</div>
              <h4 className="text-xl font-black mb-4 uppercase">Impactful Mission</h4>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">Help students launch their careers and make a real difference in how the world hires youth.</p>
            </div>
            <div className="p-12 bg-blue-600 rounded-[3rem] text-white flex flex-col justify-between min-h-[300px] cursor-default">
              <h4 className="text-2xl font-black uppercase italic tracking-tighter">Growth Opportunities</h4>
              <p className="text-blue-100 text-sm font-medium">Work with a fast-growing team and develop your skills across the entire stack.</p>
            </div>
            <div className="p-12 bg-slate-900 rounded-[3rem] text-white flex flex-col justify-between cursor-default">
              <h4 className="text-2xl font-black uppercase italic tracking-tighter">Flexible Work</h4>
              <p className="text-slate-400 text-sm font-medium">Remote-friendly and supportive of work-life balance. We care about output, not hours.</p>
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

        <div className="mt-20">
          <ScrollingText text="JOIN THE TEAM • SHAPE THE FUTURE • BUILD THE SPARK •" speed={40} />
        </div>
      </main>
    </div>
  );
}