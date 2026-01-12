import Link from "next/link";

export default function RecruiterSignUpPage() {

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Industrial Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Industrial geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-gray-600 rotate-45 animate-pulse opacity-20"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gray-800 rounded-full animate-bounce delay-1000 opacity-30"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 border-2 border-gray-500 rotate-12 animate-spin opacity-15" style={{animationDuration: '20s'}}></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-gray-700 rounded-lg animate-pulse delay-500 opacity-25"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 border-2 border-gray-400 rotate-45 animate-bounce delay-2000 opacity-20"></div>

        {/* Industrial grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Industrial gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-gray-900 to-black opacity-95"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-gray-800/10 to-transparent animate-pulse" style={{animationDuration: '8s'}}></div>

        {/* Olive green accent overlays */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-900/5 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-green-800/3 via-transparent to-transparent"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white font-['Roboto']">
            Taskspark
          </Link>
          <Link
            href="/sign-in"
            className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white leading-tight font-['Roboto']">
              Find Top
              <span className="block text-green-400">Tech Talent</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Access a curated pool of talented students, post opportunities, and build your team&apos;s future with the best emerging tech professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/sign-up-recruiter"
                className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-xl hover:shadow-green-500/30 transform hover:scale-105 cursor-pointer inline-block border-2 border-green-500"
              >
                Start Hiring Today
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-lg rounded-lg border-2 border-gray-600 hover:border-green-400 transition-all duration-300 shadow-xl hover:shadow-green-500/30 transform hover:scale-105 cursor-pointer inline-block"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-6 py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-['Roboto']">
              Powerful
              <span className="block text-green-400">Hiring Tools</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to find, evaluate, and hire the best tech talent for your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-6 border border-gray-600">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 font-['Roboto']">Access Top Talent</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Browse profiles of highly motivated students with diverse technical skills, from web development to AI and machine learning.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-6 border border-gray-600">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 font-['Roboto']">Post Opportunities</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Create detailed job postings with custom requirements, salary ranges, and company information to attract the right candidates.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-6 border border-gray-600">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 font-['Roboto']">Advanced Analytics</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Track application metrics, candidate engagement, and hiring success rates with comprehensive analytics and reporting tools.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-6 border border-gray-600">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 font-['Roboto']">Direct Communication</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Message candidates directly, schedule interviews, and conduct seamless communication throughout the hiring process.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-6 border border-gray-600">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 font-['Roboto']">Smart Filtering</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Use advanced filters to find candidates by skills, experience level, location, and availability. Save time with intelligent matching.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-6 border border-gray-600">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 font-['Roboto']">Verified Students</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
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
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700/30">
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2 font-['Roboto']">
                10,000+
              </div>
              <div className="text-gray-400 font-medium">Active Students</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700/30">
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2 font-['Roboto']">
                500+
              </div>
              <div className="text-gray-400 font-medium">Partner Companies</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700/30">
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2 font-['Roboto']">
                95%
              </div>
              <div className="text-gray-400 font-medium">Hiring Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-['Roboto']">
            Ready to Build
            <span className="block text-green-400">Your Team?</span>
          </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join leading companies who trust Taskspark to find their next great hire.
            </p>
          <Link
            href="/sign-up-recruiter"
            className="inline-block px-12 py-4 bg-green-600 hover:bg-green-500 text-white font-bold text-xl rounded-lg transition-all duration-300 shadow-xl hover:shadow-green-500/30 transform hover:scale-105 cursor-pointer border-2 border-green-500"
          >
            Start Hiring Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400">
            © 2025 Taskspark. Connecting companies with exceptional tech talent.
          </p>
        </div>
      </footer>
    </main>
  );
}