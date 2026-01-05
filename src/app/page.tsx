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
      <nav className="fixed w-full z-50 top-0 left-0 bg-black/60 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">TS</span>
            </div>
            <span className="text-white font-semibold text-lg">Techspark</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/careers" className="text-gray-300 hover:text-white">Careers</Link>
            <Link href="/why-us" className="text-gray-300 hover:text-white">Why Us</Link>
            <Link href="/about-team" className="text-gray-300 hover:text-white">About</Link>
            <Link href="/sign-in" className="px-4 py-2 bg-transparent border border-gray-700 text-gray-200 rounded-lg hover:bg-white/5">Sign in</Link>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-slate-900 text-white pt-24">
        <div className="max-w-7xl mx-auto px-6">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Launch your career with curated student opportunities
              </h2>
              <p className="text-gray-300 text-lg max-w-xl">
                Techspark connects ambitious students with internships, part-time roles and projects at vetted companies — faster and smarter.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/sign-up-student" className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 font-semibold shadow-lg hover:scale-105 transition-transform">
                  Get started — Students
                </Link>
                <Link href="/sign-up-recruiter" className="px-6 py-3 rounded-full border border-gray-700 text-gray-200 hover:bg-white/5 transition">
                  Hire students
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center">🚀</div>
                  <div>
                    <div className="text-sm text-gray-300">Fast applications</div>
                    <div className="font-medium">Apply in seconds</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center">🔒</div>
                  <div>
                    <div className="text-sm text-gray-300">Verified listings</div>
                    <div className="font-medium">High quality jobs</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/3 p-1 shadow-2xl">
                <div className="rounded-2xl bg-black p-8">
                  <h3 className="text-lg font-semibold mb-4">Featured roles</h3>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex justify-between"><span>Frontend Intern — Acme</span><span className="text-xs text-gray-400">Remote · Paid</span></li>
                    <li className="flex justify-between"><span>Data Science Project — Nova</span><span className="text-xs text-gray-400">Hybrid · Stipend</span></li>
                    <li className="flex justify-between"><span>Product Design Internship — Orbit</span><span className="text-xs text-gray-400">Remote · Paid</span></li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/careers" className="text-sm text-indigo-300 hover:underline">See all roles →</Link>
                  </div>
                </div>
              </div>
              <div className="absolute -right-8 -bottom-10 w-48 h-48 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 blur-3xl opacity-30 pointer-events-none"></div>
            </div>
          </section>

          <section className="py-12">
            <h3 className="text-2xl font-bold mb-6">Why students love Techspark</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white/5 rounded-lg">
                <h4 className="font-semibold">Personalized matches</h4>
                <p className="text-gray-300 text-sm mt-2">We surface roles that fit your profile and skills so you spend less time searching.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg">
                <h4 className="font-semibold">Verified employers</h4>
                <p className="text-gray-300 text-sm mt-2">All companies are vetted — no spam, only real opportunities.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-lg">
                <h4 className="font-semibold">Easy applications</h4>
                <p className="text-gray-300 text-sm mt-2">Apply once and reuse your profile for many roles.</p>
              </div>
            </div>
          </section>

          <section className="py-12">
            <h3 className="text-2xl font-bold mb-6">What students say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <blockquote className="p-6 bg-white/5 rounded-lg italic text-gray-200">“I found my internship in under a week — the process was painless.” — Asha, CS</blockquote>
              <blockquote className="p-6 bg-white/5 rounded-lg italic text-gray-200">“Companies here actually reply. I built my first product with a startup.” — Mateo, UX</blockquote>
              <blockquote className="p-6 bg-white/5 rounded-lg italic text-gray-200">“Great for students who want real work experience.” — Priya, Data</blockquote>
            </div>
          </section>

          <footer className="py-12 border-t border-gray-800 mt-12 text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>© {new Date().getFullYear()} Techspark</div>
              <div className="flex gap-4">
                <Link href="/about-team" className="hover:text-white">About</Link>
                <Link href="/why-us" className="hover:text-white">Privacy</Link>
                <Link href="/careers" className="hover:text-white">Jobs</Link>
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
