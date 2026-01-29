import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import ApplicantList from "@/components/recruiter/ApplicantList";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const dynamic = "force-dynamic";
export default async function ApplicantsPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  const supabase = createServerClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("clerk_user_id", user.id)
    .single();

  if (!profile || profile.role !== "recruiter") {
    redirect("/dashboard");
  }

  // Verify job belongs to recruiter
  const { data: job } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", params.id)
    .eq("recruiter_id", profile.id)
    .single();

  if (!job) {
    redirect("/dashboard");
  }

  return (
    <DashboardLayout role="recruiter">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Applicants for {job.title}</h1>
          <p className="text-slate-600">Review and manage applications for this position</p>
        </div>
        <ApplicantList jobId={params.id} />
      </div>
    </DashboardLayout>
  );
}

