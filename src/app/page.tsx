import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ScrollingText from "@/components/ScrollingText";
import TypingAnimation from "@/components/TypingAnimation";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Temporarily disable authentication check to fix server startup
  // try {
  //   const user = await currentUser();
  //
  //   if (user) {
  //     // Redirect to appropriate dashboard based on role
  //     redirect("/dashboard");
  //   }
  // } catch (error) {
  //   console.error("Error getting current user:", error);
  //   // Continue to show the home page even if there's an error
  // }

  return (
    <>
      <nav className="fixed w-full z-50 top-0 left-0 bg-white/90 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">TS</span>
            </div>
            <span className="text-slate-900 font-semibold text-lg">Techspark</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/careers" className="text-slate-700 hover:text-slate-900">Careers</Link>
            <Link href="/why-us" className="text-slate-700 hover:text-slate-900">Why Us</Link>
            <Link href="/about-team" className="text-slate-700 hover:text-slate-900">About</Link>
            <Link href="/sign-in" className="px-4 py-2 bg-transparent border border-slate-300 text-slate-900 rounded-lg hover:bg-slate-50">Sign in</Link>
          </div>
        </div>
      </nav>

      {/* Landing hero section (white background, minimal text + CTAs) */}
      <section className="bg-white text-slate-900 pt-24">
        <div className="max-w-3xl mx-auto px-6 text-center py-16">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs mb-6">
            ⚡ The future of youth talent is here
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Small tasks. <span className="text-blue-600">Big</span> opportunities.
            <br />Powered by youth.
          </h1>
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto">
            TaskSpark connects motivated students with businesses that need quick, affordable help — turning everyday tasks into real experience.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/post-task" className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm">
              Post a Task
            </Link>
            <Link href="/sign-up-student" className="px-6 py-3 rounded-md border border-slate-300 text-slate-900 hover:border-slate-400 font-semibold">
              Join as a Student
            </Link>
          </div>
        </div>
      </section>

      <main className="min-h-screen bg-white text-slate-900 pt-24">
        <div className="max-w-7xl mx-auto px-6">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Launch your career with curated student opportunities
              </h2>
              <p className="text-slate-600 text-lg max-w-xl">
                Techspark connects ambitious students with internships, part-time roles and projects at vetted companies — faster and smarter.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/sign-up-student" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold shadow-lg hover:scale-105 transition-transform">
                  Get started — Students
                </Link>
                <Link href="/sign-up-recruiter" className="px-6 py-3 rounded-full border border-slate-300 text-slate-900 hover:bg-slate-50 transition">
                  Hire students
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center">🚀</div>
                  <div>
                    <div className="text-sm text-slate-600">Fast applications</div>
                    <div className="font-medium">Apply in seconds</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center">🔒</div>
                  <div>
                    <div className="text-sm text-slate-600">Verified listings</div>
                    <div className="font-medium">High quality jobs</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-1 shadow-2xl">
                <div className="rounded-2xl bg-white p-8">
                  <h3 className="text-lg font-semibold mb-4">Featured roles</h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex justify-between"><span>Frontend Intern — Acme</span><span className="text-xs text-slate-500">Remote · Paid</span></li>
                    <li className="flex justify-between"><span>Data Science Project — Nova</span><span className="text-xs text-slate-500">Hybrid · Stipend</span></li>
                    <li className="flex justify-between"><span>Product Design Internship — Orbit</span><span className="text-xs text-slate-500">Remote · Paid</span></li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/careers" className="text-sm text-blue-600 hover:underline">See all roles →</Link>
                  </div>
                </div>
              </div>
              <div className="absolute -right-8 -bottom-10 w-48 h-48 rounded-full bg-gradient-to-r from-cyan-600 to-blue-500 blur-3xl opacity-30 pointer-events-none"></div>
            </div>
          </section>

          <section className="py-12">
            <h3 className="text-2xl font-bold mb-6">Why students love Techspark</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-50 rounded-lg">
                <h4 className="font-semibold">Personalized matches</h4>
                <p className="text-slate-600 text-sm mt-2">We surface roles that fit your profile and skills so you spend less time searching.</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-lg">
                <h4 className="font-semibold">Verified employers</h4>
                <p className="text-slate-600 text-sm mt-2">All companies are vetted — no spam, only real opportunities.</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-lg">
                <h4 className="font-semibold">Easy applications</h4>
                <p className="text-slate-600 text-sm mt-2">Apply once and reuse your profile for many roles.</p>
              </div>
            </div>
          </section>

          <section className="py-12">
            <h3 className="text-2xl font-bold mb-6">What students say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <blockquote className="p-6 bg-slate-50 rounded-lg italic text-slate-700">“I found my internship in under a week — the process was painless.” — Asha, CS</blockquote>
              <blockquote className="p-6 bg-slate-50 rounded-lg italic text-slate-700">“Companies here actually reply. I built my first product with a startup.” — Mateo, UX</blockquote>
              <blockquote className="p-6 bg-slate-50 rounded-lg italic text-slate-700">“Great for students who want real work experience.” — Priya, Data</blockquote>
            </div>
          </section>

          <footer className="py-12 border-t border-slate-200 mt-12 text-slate-600">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>© {new Date().getFullYear()} Techspark</div>
              <div className="flex gap-4">
                <Link href="/about-team" className="hover:text-slate-900">About</Link>
                <Link href="/why-us" className="hover:text-slate-900">Privacy</Link>
                <Link href="/careers" className="hover:text-slate-900">Jobs</Link>
              </div>
            </div>
          </footer>
        </div>

        <div className="pointer-events-none mt-16">
          <ScrollingText text="#1 student hiring platform • Techspark" speed={60} />
        </div>
      </main>
    </>
  );
}
