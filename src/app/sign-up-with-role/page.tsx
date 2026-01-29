import { SignUp } from "@clerk/nextjs";

export default async function SignUpWithRolePage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const params = await searchParams;
  const role = params.role === "recruiter" ? "recruiter" : "student";
  
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-slate-900">
          Sign Up - {role === "recruiter" ? "Companies" : "Students"}
        </h1>
        <SignUp 
          appearance={{
            variables: {
              colorText: "#0f172a",
              colorTextSecondary: "#475569",
              colorInputText: "#0f172a",
              colorBackground: "#ffffff",
              colorInputBackground: "#ffffff",
              colorPrimary: "#2563eb",
            },
            elements: {
              rootBox: "mx-auto",
              card: "bg-white border border-slate-200",
              headerTitle: "text-slate-900",
              headerSubtitle: "text-slate-600",
              socialButtonsBlockButton: "bg-white border-slate-200 hover:bg-slate-50 text-slate-900",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
              footerActionLink: "text-blue-600 hover:text-blue-700",
              formFieldLabel: "text-slate-700",
              formFieldInput: "bg-white border-slate-300 text-slate-900",
              identityPreviewText: "text-slate-900",
              identityPreviewEditButton: "text-blue-600",
              formResendCodeLink: "text-blue-600",
              footerPagesLink: "text-slate-600",
              dividerLine: "bg-slate-200",
              dividerText: "text-slate-500",
              alertText: "text-slate-600",
              formFieldErrorText: "text-red-600",
            },
          }}
          forceRedirectUrl={`/onboarding?role=${role}`}
          fallbackRedirectUrl={`/onboarding?role=${role}`}
        />
      </div>
    </div>
  );
}
