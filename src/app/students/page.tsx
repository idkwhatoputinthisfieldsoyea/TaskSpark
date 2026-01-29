import Link from "next/link";

export default function StudentSignUpPage() {

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-hidden relative">

      {/* Header */}
      <header className="relative z-10 px-6 py-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
<<<<<<< HEAD
          <div className="text-3xl font-bold tracking-wider text-white">TASKSPARK</div>
=======
          <div className="text-3xl font-bold tracking-wider text-slate-900">TASKSPARK</div>
>>>>>>> origin/test
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium">Features</a>
            <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium">About</a>
            <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors duration-300 font-medium">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative z-10">
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
              Launch Your
              <span className="block text-blue-600">Tech Career</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Connect with top companies, showcase your skills, and land your dream internship or job in technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Link
                href="/sign-up-student"
                className="px-10 py-5 bg-blue-600 text-white font-bold text-xl rounded-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/20 transform hover:scale-105 hover:bg-blue-700 border-2 border-blue-500"
              >
                Get Started Free
              </Link>
              <Link
                href="#features"
                className="px-10 py-5 border-2 border-slate-300 text-slate-900 font-bold text-xl rounded-lg hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:bg-blue-50"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-6 py-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Everything You Need
              <span className="block text-blue-600">to Succeed</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Powerful tools and features designed specifically for students building their tech careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justifycenter mb-6 border border-slate-200">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Build Your Portfolio</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Create a stunning portfolio showcasing your projects, skills, and achievements. Stand out to employers with a professional online presence.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-6 border border-slate-200">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Job Matching</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our AI-powered matching system connects you with opportunities that perfectly align with your skills, interests, and career goals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-6 border border-slate-200">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Direct Communication</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Message recruiters directly, schedule interviews, and build relationships with companies interested in your talent.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-6 border border-slate-200">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Track Applications</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Monitor your application status, manage interviews, and keep track of all your opportunities in one centralized dashboard.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:border-blue-500/50 transition-colors duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Skill Development</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Access resources, tutorials, and learning paths to continuously improve your technical skills and stay competitive.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:border-blue-500/50 transition-colors duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Verified Opportunities</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                All job postings are verified and vetted. Apply with confidence knowing you&apos;re engaging with legitimate companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
<<<<<<< HEAD
            <p className="text-xl text-slate-400 mb-8">
            Join thousands of students who have launched successful tech careers with Taskspark.
=======
          <p className="text-xl text-slate-600 mb-8">
            Join thousands of students who have launched successful tech careers with TaskSpark.
>>>>>>> origin/test
          </p>
          <Link
            href="/sign-up-student"
            className="inline-block px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl rounded-xl transition-all duration-300 shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 cursor-pointer border border-blue-500"
          >
            Create Your Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
<<<<<<< HEAD
          <p className="text-gray-400">
            © 2025 Taskspark. Empowering the next generation of tech talent.
=======
          <p className="text-slate-600">
            © 2025 TaskSpark. Empowering the next generation of tech talent.
>>>>>>> origin/test
          </p>
        </div>
      </footer>
    </main>
  );
}