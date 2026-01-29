import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import OnboardingForm from "@/components/OnboardingForm";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  const params = await searchParams;
  // Validate role parameter
  const preselectedRole = params.role === "recruiter" ? "recruiter" : "student";

  // Extract only the necessary user data to avoid serialization issues
  const userData = {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-[10%] w-[400px] h-[400px] bg-gradient-to-br from-blue-400/15 to-indigo-300/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-[5%] w-[350px] h-[350px] bg-gradient-to-br from-cyan-300/15 to-blue-300/15 rounded-full blur-[90px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Complete Your Profile</h1>
        <OnboardingForm user={userData} preselectedRole={preselectedRole} />
      </div>
    </div>
  );
}
