import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import MessagesView from "@/components/shared/MessagesView";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const dynamic = "force-dynamic";
export default async function MessagesPage({
  searchParams,
}: {
  searchParams: { receiver_id?: string; job_id?: string };
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

  if (!profile) {
    redirect("/dashboard");
  }

  // If a job_id is provided but no receiver_id, resolve recruiter id for student users
  let receiverId = searchParams.receiver_id;
  if (!receiverId && searchParams.job_id && profile.role === "student") {
    const { data: job } = await supabase
      .from("jobs")
      .select("recruiter_id")
      .eq("id", searchParams.job_id)
      .single();

    if (job?.recruiter_id) {
      receiverId = job.recruiter_id;
    }
  }

  return (
    <DashboardLayout role={profile.role}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
        <MessagesView
          profileId={profile.id}
          receiverId={receiverId}
          jobId={searchParams.job_id}
        />
      </div>
    </DashboardLayout>
  );
}

