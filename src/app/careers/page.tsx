import Link from "next/link";

export default function Careers() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors">
                Taskspark
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/careers"
                className="text-white px-3 py-2 rounded-md text-sm font-medium bg-white/10"
              >
                Careers
              </Link>
              <Link
                href="/about-team"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white/10"
              >
                About the Team
              </Link>
              <Link
                href="/why-us"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white/10"
              >
                Why Us?
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-300 hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                aria-expanded="false"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/careers"
              className="text-white block px-3 py-2 rounded-md text-base font-medium bg-white/10"
            >
              Careers
            </Link>
            <Link
              href="/about-team"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
            >
              About the Team
            </Link>
            <Link
              href="/why-us"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
            >
              Why Us?
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Careers at Taskspark</h1>
        <p className="text-xl text-gray-300 text-center mb-12">
          Join our team and help shape the future of student hiring.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Software Engineer</h3>
            <p className="text-gray-300 mb-4">
              Build cutting-edge platforms that connect students with opportunities.
            </p>
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
              Apply Now
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Product Manager</h3>
            <p className="text-gray-300 mb-4">
              Drive product strategy and user experience for our platform.
            </p>
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
              Apply Now
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">UX Designer</h3>
            <p className="text-gray-300 mb-4">
              Create intuitive and beautiful interfaces for our users.
            </p>
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
              Apply Now
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Data Analyst</h3>
            <p className="text-gray-300 mb-4">
              Analyze user data to improve our platform and services.
            </p>
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}