"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "student" | "recruiter";
}

const studentNavItems = [
  { href: "/dashboard", label: "Job Feed" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/applications", label: "Applications" },
  { href: "/dashboard/messages", label: "Messages" },
];

const recruiterNavItems = [
  { href: "/dashboard", label: "Jobs" },
  { href: "/dashboard/create-job", label: "Create Job" },
  { href: "/dashboard/applicants", label: "Applicants" },
  { href: "/dashboard/messages", label: "Messages" },
];

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const pathname = usePathname();
  const navItems = role === "student" ? studentNavItems : recruiterNavItems;

  return (
    <div className="min-h-screen bg-dark-bg">
      <nav className="bg-dark-surface border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
<<<<<<< HEAD
              <Link href="/dashboard" className="text-2xl font-bold text-purple-400">
                Taskspark
=======
              <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
                TaskSpark
>>>>>>> origin/test
              </Link>
              <div className="ml-10 flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <UserButton />
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

