import Link from "next/link";

export default function RecruiterSignUpPage() {

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-hidden relative">

      {/* Header */}
      <header className="relative z-10 px-6 py-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
<<<<<<< HEAD
          <Link href="/" className="text-2xl font-bold text-white font-['Roboto']">
            Taskspark
=======
          <Link href="/" className="text-2xl font-bold text-slate-900">
            TaskSpark
>>>>>>> origin/test
          </Link>
          <Link
            href="/sign-in"
            className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Find Top
              <span className="block text-blue-600">Tech Talent</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Access a curated pool of talented students, post opportunities, and build your team&apos;s future with the best emerging tech professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/sign-up-recruiter"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 cursor-pointer inline-block border-2 border-blue-500"
              >
                Start Hiring Today
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 bg-white text-slate-900 font-bold text-lg rounded-lg border-2 border-slate-300 hover:border-blue-500 transition-all duration-300 shadow-sm transform hover:scale-105 cursor-pointer inline-block"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful
              <span className="block text-blue-600">Hiring Tools</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to find, evaluate, and hire the best tech talent for your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-6 border border-slate-200">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Access Top Talent</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Browse profiles of highly motivated students with diverse technical skills, from web development to AI and machine learning.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-6 border border-slate-200">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Post Opportunities</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Create detailed job postings with custom requirements, salary ranges, and company information to attract the right candidates.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-6 border border-slate-200">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Advanced Analytics</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Track application metrics, candidate engagement, and hiring success rates with comprehensive analytics and reporting tools.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-6 border border-slate-200">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Direct Communication</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Message candidates directly, schedule interviews, and conduct seamless communication throughout the hiring process.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-6 border border-slate-200">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Filtering</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Use advanced filters to find candidates by skills, experience level, location, and availability. Save time with intelligent matching.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-6 border border-slate-200">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Verified Students</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                All student profiles are verified with educational background checks. Hire with confidence knowing candidate credentials are legitimate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                10,000+
              </div>
              <div className="text-slate-600 font-medium">Active Students</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                500+
              </div>
              <div className="text-slate-600 font-medium">Partner Companies</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                95%
              </div>
              <div className="text-slate-600 font-medium">Hiring Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build
            <span className="block text-blue-600">Your Team?</span>
          </h2>
<<<<<<< HEAD
            <p className="text-xl text-gray-300 mb-8">
              Join leading companies who trust Taskspark to find their next great hire.
            </p>
=======
          <p className="text-xl text-slate-600 mb-8">
            Join leading companies who trust TaskSpark to find their next great hire.
          </p>
>>>>>>> origin/test
          <Link
            href="/sign-up-recruiter"
            className="inline-block px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl rounded-lg transition-all duration-300 shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 cursor-pointer border-2 border-blue-500"
          >
            Start Hiring Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
<<<<<<< HEAD
            <p className="text-gray-400">
            © 2025 Taskspark. Connecting companies with exceptional tech talent.
=======
          <p className="text-slate-600">
            © 2025 TaskSpark. Connecting companies with exceptional tech talent.
>>>>>>> origin/test
          </p>
        </div>
      </footer>
    </main>
  );
}