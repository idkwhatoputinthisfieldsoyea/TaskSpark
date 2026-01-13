"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface OnboardingFormProps {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  preselectedRole?: "student" | "recruiter";
}

export default function OnboardingForm({ user, preselectedRole = "student" }: OnboardingFormProps) {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "recruiter">(preselectedRole);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/profile/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerk_user_id: user.id,
          email: user.email,
          full_name: user.firstName && user.lastName 
            ? `${user.firstName} ${user.lastName}` 
            : user.firstName || user.lastName || "",
          role,
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        const errorData = await response.json();
        console.error("Failed to create profile:", errorData.error);
        alert("Failed to create profile. Please try again.");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-dark-surface p-8 rounded-lg border border-dark-border">
      <div>
        <label className="block text-sm font-medium mb-2 text-slate-700">I am a:</label>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="student"
              checked={role === "student"}
              onChange={(e) => setRole(e.target.value as "student")}
              className="mr-2"
            />
            <span className="text-slate-700">Student</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              value="recruiter"
              checked={role === "recruiter"}
              onChange={(e) => setRole(e.target.value as "recruiter")}
              className="mr-2"
            />
            <span className="text-slate-700">Recruiter/Employer</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? "Creating Profile..." : "Continue"}
      </button>
    </form>
  );
}
