import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export default async function ApplicantsIndexPage() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const supabase = createServerClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("clerk_user_id", user.id)
    .single();

  if (!profile || profile.role !== "recruiter") {
    redirect("/dashboard");
  }

  // get jobs for recruiter
  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, title")
    .eq("recruiter_id", profile.id)
    .order("created_at", { ascending: false });

  const jobIds = (jobs || []).map((j: any) => j.id);

  let applications: any[] = [];
  if (jobIds.length > 0) {
    const { data } = await supabase
      .from("applications")
      .select(`*, student:profiles!applications_student_id_fkey(*), job:jobs(*)`)
      .in("job_id", jobIds)
      .order("created_at", { ascending: false });

    applications = data || [];
  }

  // group applications by job id
  const grouped = jobIds.reduce((acc: Record<string, any[]>, id: string) => {
    acc[id] = [];
    return acc;
  }, {} as Record<string, any[]>);

  for (const app of applications) {
    grouped[app.job_id] = grouped[app.job_id] || [];
    grouped[app.job_id].push(app);
  }

  return (
    <DashboardLayout role="recruiter">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Applicants</h1>
          <p className="text-slate-600">All applicants for your open positions</p>
        </div>

        {jobs && jobs.length === 0 && (
          <div className="text-center text-slate-500 py-12">You have no jobs posted yet.</div>
        )}

        <div className="space-y-6">
          {(jobs || []).map((job: any) => (
            <section key={job.id} className="bg-dark-surface border border-dark-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{job.title}</h2>
                  <p className="text-sm text-slate-600">{(grouped[job.id] || []).length} applicants</p>
                </div>
              </div>

              {(grouped[job.id] || []).length === 0 ? (
                <p className="text-sm text-slate-600">No applicants yet.</p>
              ) : (
                <div className="space-y-4">
                  {(grouped[job.id] || []).map((app: any) => (
                    <div key={app.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{app.student?.full_name || 'Unknown'}</p>
                        <p className="text-sm text-slate-600">{app.student?.email}</p>
                        <p className="text-sm text-slate-500">Applied {formatDate(app.created_at)}</p>
                      </div>
                      <div className="text-sm text-slate-700">{app.status}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
