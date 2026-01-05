import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import CreateJobForm from "@/components/recruiter/CreateJobForm";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const dynamic = "force-dynamic";
export default async function CreateJobPage() {
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

  return (
    <DashboardLayout role="recruiter">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Create Job Posting</h1>
        <CreateJobForm recruiterId={profile.id} />
      </div>
    </DashboardLayout>
  );
}

