import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import ApplicationList from "@/components/student/ApplicationList";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default async function ApplicationsPage() {
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

  if (!profile || profile.role !== "student") {
    redirect("/dashboard");
  }

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">My Applications</h1>
        <ApplicationList studentId={profile.id} />
      </div>
    </DashboardLayout>
  );
}

