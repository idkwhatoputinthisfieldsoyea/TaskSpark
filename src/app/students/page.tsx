import Link from "next/link";

export default function StudentSignUpPage() {

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
      <header className="relative z-10 px-6 py-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold tracking-wider text-white">TASKSPARK</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium">Features</a>
            <a href="#about" className="text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium">About</a>
            <a href="#contact" className="text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative z-10">
            <h1 className="text-6xl md:text-8xl font-black mb-8 text-white leading-tight tracking-tight">
              Launch Your
              <span className="block text-green-400">Tech Career</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Connect with top companies, showcase your skills, and land your dream internship or job in technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Link
                href="/sign-up-student"
                className="px-10 py-5 bg-green-600 text-white font-bold text-xl rounded-lg transition-all duration-300 shadow-2xl hover:shadow-green-500/20 transform hover:scale-105 hover:bg-green-500 border-2 border-green-500"
              >
                Get Started Free
              </Link>
              <Link
                href="#features"
                className="px-10 py-5 border-2 border-gray-600 text-gray-300 font-bold text-xl rounded-lg hover:border-green-400 hover:text-green-400 transition-all duration-300 transform hover:scale-105 hover:bg-green-400/5"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-6 py-32 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
              Everything You Need
              <span className="block text-green-400">to Succeed</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Powerful tools and features designed specifically for students building their tech careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-6 border border-gray-600">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Build Your Portfolio</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Create a stunning portfolio showcasing your projects, skills, and achievements. Stand out to employers with a professional online presence.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-6 border border-gray-600">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Smart Job Matching</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our AI-powered matching system connects you with opportunities that perfectly align with your skills, interests, and career goals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-6 border border-gray-600">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Direct Communication</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Message recruiters directly, schedule interviews, and build relationships with companies interested in your talent.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-6 border border-gray-600">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Track Applications</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Monitor your application status, manage interviews, and keep track of all your opportunities in one centralized dashboard.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50 hover:border-blue-500/50 transition-colors duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-4 font-['Roboto']">Skill Development</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Access resources, tutorials, and learning paths to continuously improve your technical skills and stay competitive.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50 hover:border-blue-500/50 transition-colors duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-4 font-['Roboto']">Verified Opportunities</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                All job postings are verified and vetted. Apply with confidence knowing you&apos;re engaging with legitimate companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-300 to-cyan-400 bg-clip-text text-transparent font-['Roboto']">
            Ready to Start Your Journey?
          </h2>
            <p className="text-xl text-slate-400 mb-8">
            Join thousands of students who have launched successful tech careers with Taskspark.
          </p>
          <Link
            href="/sign-up-student"
            className="inline-block px-12 py-4 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-slate-100 font-bold text-xl rounded-xl transition-all duration-300 shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 cursor-pointer border border-slate-500/50"
          >
            Create Your Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Taskspark. Empowering the next generation of tech talent.
          </p>
        </div>
      </footer>
    </main>
  );
}