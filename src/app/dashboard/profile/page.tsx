import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import StudentProfileForm from "@/components/student/StudentProfileForm";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const dynamic = "force-dynamic";
export default async function ProfilePage() {
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

  const { data: studentProfile } = await supabase
    .from("student_profiles")
    .select("*")
    .eq("profile_id", profile.id)
    .single();

  return (
    <DashboardLayout role="student">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Your Profile</h1>
        <StudentProfileForm
          profileId={profile.id}
          initialData={studentProfile}
        />
      </div>
    </DashboardLayout>
  );
}

