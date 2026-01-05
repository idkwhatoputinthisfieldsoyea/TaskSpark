import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import JobFeed from "@/components/student/JobFeed";
import { createServerClient } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";
import { Application, Job } from "@/types/database";

interface StudentDashboardProps {
  profileId: string;
}

interface ApplicationWithJob extends Application {
  job: Job;
}

export default async function StudentDashboard({ profileId }: StudentDashboardProps) {
  const supabase = createServerClient();

  const [{ data: studentProfile }, { data: applications }] = await Promise.all([
    supabase.from("student_profiles").select("*").eq("profile_id", profileId).single(),
    supabase
      .from("applications")
      .select("*, job:jobs(*)")
      .eq("student_id", profileId)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const applicationList = (applications || []) as ApplicationWithJob[];

  const statusCounts = applicationList.reduce(
    (acc, app) => {
      acc.total += 1;
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    },
    { total: 0, applied: 0, reviewed: 0, accepted: 0, rejected: 0 } as Record<string, number>
  );

  const completionItems = [
    { label: "Skills", complete: Boolean(studentProfile?.skills?.length) },
    { label: "Bio", complete: Boolean(studentProfile?.bio) },
    { label: "Availability", complete: Boolean(studentProfile?.availability) },
    { label: "Resume", complete: Boolean(studentProfile?.resume_url) },
    { label: "Projects", complete: Boolean(studentProfile?.projects?.length) },
  ];

  const completionPercent = Math.round(
    (completionItems.filter((item) => item.complete).length / completionItems.length) * 100
  );

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-gray-400">Welcome back</p>
            <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/profile"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Update profile
            </Link>
            <Link
              href="/dashboard/applications"
              className="px-4 py-2 border border-dark-border text-white text-sm font-semibold rounded-lg hover:border-purple-500 hover:text-purple-200 transition-colors"
            >
              View applications
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total applications" value={statusCounts.total} hint="Across all roles" />
          <StatCard label="In review" value={statusCounts.reviewed} hint="Awaiting recruiter" />
          <StatCard label="Accepted" value={statusCounts.accepted} hint="Offers / next steps" />
          <StatCard label="Rejected" value={statusCounts.rejected} hint="Keep applying" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">Job Feed</h2>
                <span className="text-sm text-gray-400">Curated for you</span>
              </div>
              <JobFeed />
            </section>
          </div>

          <div className="space-y-6">
            <ProfileCompletion
              completionPercent={completionPercent}
              items={completionItems}
              hasProfile={Boolean(studentProfile)}
            />

            <RecentApplications applications={applicationList} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg p-4">
      <p className="text-sm text-gray-400">{label}</p>
      <div className="mt-2 text-3xl font-bold text-white">{value}</div>
      <p className="text-xs text-gray-500 mt-1">{hint}</p>
    </div>
  );
}

function ProfileCompletion({
  completionPercent,
  items,
  hasProfile,
}: {
  completionPercent: number;
  items: { label: string; complete: boolean }[];
  hasProfile: boolean;
}) {
  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Profile completeness</h3>
          <p className="text-sm text-gray-400">Higher completion improves matches</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-purple-900/40 text-purple-200 text-sm font-semibold">
          {completionPercent}%
        </span>
      </div>

      <div className="w-full bg-dark-border rounded-full h-2">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700"
          style={{ width: `${completionPercent}%` }}
        />
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm text-gray-200">
            <span>{item.label}</span>
            <span className={item.complete ? "text-green-400" : "text-gray-500"}>
              {item.complete ? "Done" : "Add"}
            </span>
          </div>
        ))}
      </div>

      {!hasProfile && (
        <div className="text-sm text-yellow-200 bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-3">
          Finish onboarding to start applying.
        </div>
      )}

      <Link
        href="/dashboard/profile"
        className="inline-flex items-center justify-center w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors"
      >
        Complete profile
      </Link>
    </div>
  );
}

function RecentApplications({ applications }: { applications: ApplicationWithJob[] }) {
  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Recent applications</h3>
        <Link href="/dashboard/applications" className="text-sm text-purple-300 hover:text-purple-200">
          View all
        </Link>
      </div>

      {applications.length === 0 ? (
        <p className="text-sm text-gray-400">No applications yet. Start applying to roles.</p>
      ) : (
        <div className="space-y-3">
          {applications.map((application) => (
            <div key={application.id} className="flex items-start justify-between gap-3 rounded-lg border border-dark-border p-3">
              <div>
                <p className="text-sm text-gray-400">Applied {formatDate(application.created_at)}</p>
                <p className="text-base font-semibold text-white">{application.job?.title}</p>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {application.job?.description?.slice(0, 140)}
                  {application.job?.description && application.job.description.length > 140 ? "..." : ""}
                </p>
              </div>
              <span className={statusBadgeClass(application.status)}>{application.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function statusBadgeClass(status: Application["status"]) {
  const base = "px-3 py-1 rounded-full text-xs font-semibold capitalize";
  switch (status) {
    case "applied":
      return `${base} bg-blue-900/40 text-blue-200`;
    case "reviewed":
      return `${base} bg-yellow-900/40 text-yellow-200`;
    case "accepted":
      return `${base} bg-green-900/40 text-green-200`;
    case "rejected":
    default:
      return `${base} bg-red-900/40 text-red-200`;
  }
}

