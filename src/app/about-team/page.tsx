import Link from "next/link";

export default function AboutTeam() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
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
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">About Our Team</h1>
        <p className="text-xl text-gray-300 text-center mb-12">
          Meet the passionate individuals behind Taskspark.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              AR
            </div>
            <h3 className="text-xl font-semibold mb-2">Aydin Rizzqi</h3>
            <p className="text-gray-400">CEO & Founder</p>
            <p className="text-sm text-gray-500 mt-2">
              Leading the vision and strategy for Taskspark&apos;s future.
            </p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              PS
            </div>
            <h3 className="text-xl font-semibold mb-2">Pranav Singh</h3>
            <p className="text-gray-400">CTO</p>
            <p className="text-sm text-gray-500 mt-2">
              Driving technical innovation and platform development.
            </p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              PS
            </div>
            <h3 className="text-xl font-semibold mb-2">Pranav Singh</h3>
            <p className="text-gray-400">Head of Design</p>
            <p className="text-sm text-gray-500 mt-2">
              Crafting beautiful and intuitive user experiences.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We&apos;re a passionate team led by Aydin Rizzqi, with Pranav Singh driving our technical vision
            and design excellence. Together, we&apos;re building the future of student hiring, connecting
            talented individuals with meaningful career opportunities.
          </p>
        </div>
      </div>
    </div>
  );
}