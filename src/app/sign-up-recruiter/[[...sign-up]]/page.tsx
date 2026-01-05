import { SignUp } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function RecruiterSignUpPage() {
  const user = await currentUser();

  if (user) {
    // User is already signed in, redirect to dashboard
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-dark-bg">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-400">Sign Up - Companies</h1>
        <SignUp 
          appearance={{
            variables: {
              colorText: "#ffffff",
              colorTextSecondary: "#d1d5db",
              colorInputText: "#ffffff",
              colorBackground: "#111111",
              colorInputBackground: "#0a0a0a",
              colorPrimary: "#9333ea",
            },
            elements: {
              rootBox: "mx-auto",
              card: "bg-dark-surface border-dark-border",
              headerTitle: "text-purple-400",
              headerSubtitle: "text-gray-300",
              socialButtonsBlockButton: "bg-dark-surface border-dark-border hover:bg-dark-border text-white",
              formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
              footerActionLink: "text-purple-400 hover:text-purple-300",
              formFieldLabel: "text-gray-300",
              formFieldInput: "bg-dark-bg border-dark-border text-white",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-purple-400",
              formResendCodeLink: "text-purple-400",
              footerPagesLink: "text-gray-300",
              dividerLine: "bg-dark-border",
              dividerText: "text-gray-400",
              alertText: "text-gray-300",
              formFieldErrorText: "text-red-400",
            },
          }}
          afterSignUpUrl="/onboarding?role=recruiter"
        />
      </div>
    </div>
  );
}

