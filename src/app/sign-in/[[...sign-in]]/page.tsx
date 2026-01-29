import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white">
      <SignIn 
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
            headerTitle: "text-blue-600",
            headerSubtitle: "text-slate-600",
            socialButtonsBlockButton: "bg-white border border-slate-200 hover:bg-slate-50 text-slate-900",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
            footerActionLink: "text-blue-600 hover:text-blue-700",
            formFieldLabel: "text-slate-600",
            formFieldInput: "bg-white border border-slate-300 text-slate-900",
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
        forceRedirectUrl="/dashboard"
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
}

