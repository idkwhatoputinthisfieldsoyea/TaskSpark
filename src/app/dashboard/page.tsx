import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import StudentDashboard from "@/components/dashboards/StudentDashboard";
import RecruiterDashboard from "@/components/dashboards/RecruiterDashboard";

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  const supabase = createServerClient();
  
  // Get user profile from database
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("clerk_user_id", user.id)
    .single();

  // If no profile exists, redirect to onboarding
  if (!profile) {
    redirect("/onboarding");
  }

  // Render appropriate dashboard based on role
  if (profile.role === "student") {
    return <StudentDashboard profileId={profile.id} />;
  } else {
    return <RecruiterDashboard userId={user.id} profileId={profile.id} />;
  }
}

