import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import OnboardingForm from "@/components/OnboardingForm";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: { role?: string };
}) {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  // Validate role parameter
  const preselectedRole = searchParams.role === "recruiter" ? "recruiter" : "student";

  // Extract only the necessary user data to avoid serialization issues
  const userData = {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Complete Your Profile</h1>
        <OnboardingForm user={userData} preselectedRole={preselectedRole} />
      </div>
    </div>
  );
}
