import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-dark-bg">
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
      />
    </div>
  );
}

