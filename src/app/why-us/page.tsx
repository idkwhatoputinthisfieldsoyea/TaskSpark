import Link from "next/link";

export default function WhyUs() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-slate-900">
                Techspark
              </Link>
            </div>
            <div className="flex space-x-8">
              <Link href="/careers" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">
                Careers
              </Link>
              <Link href="/about-team" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">
                About the Team
              </Link>
              <Link href="/why-us" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">
                Why Us?
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Why Choose Techspark?</h1>
        <p className="text-xl text-slate-600 text-center mb-12">
          Discover what makes us the premier platform for student hiring.
        </p>

        <div className="space-y-12">
          <div className="bg-white border border-slate-200 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">🎯 Smart Matching Technology</h2>
            <p className="text-slate-600">
              Our AI-powered matching system connects students with opportunities that perfectly
              align with their skills, interests, and career goals. No more endless scrolling
              through irrelevant job postings.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">🚀 Fast & Easy Application Process</h2>
            <p className="text-slate-600">
              Apply to multiple opportunities with a single profile. Our streamlined process
              takes minutes, not hours, saving you valuable time to focus on what matters most.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">✅ Verified Opportunities</h2>
            <p className="text-slate-600">
              Every job posting on our platform is carefully vetted and verified. We ensure
              quality opportunities from reputable companies, giving you peace of mind.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">🌟 Comprehensive Support</h2>
            <p className="text-slate-600">
              From resume building to interview preparation, our platform provides tools and
              resources to help you succeed at every step of your career journey.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">📊 Data-Driven Insights</h2>
            <p className="text-slate-600">
              Get personalized insights about your profile strength, application success rates,
              and market trends to make informed decisions about your career path.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/sign-up-student"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
}