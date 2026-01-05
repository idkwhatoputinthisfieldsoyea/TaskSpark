"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CreateJobFormProps {
  recruiterId: string;
}

export default function CreateJobForm({ recruiterId }: CreateJobFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills_required: "",
    duration: "",
    pay: "",
    location: "",
    is_remote: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const skillsArray = formData.skills_required
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          skills_required: skillsArray,
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        alert("Failed to create job posting");
      }
    } catch (error) {
      console.error("Error creating job:", error);
      alert("An error occurred while creating the job posting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-dark-surface border border-dark-border rounded-lg p-6">
      <div>
        <label className="block text-sm font-medium mb-2">Job Title *</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description *</label>
        <textarea
          required
          rows={6}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Skills Required (comma-separated) *</label>
        <input
          type="text"
          required
          value={formData.skills_required}
          onChange={(e) => setFormData({ ...formData, skills_required: e.target.value })}
          placeholder="e.g., React, TypeScript, Node.js"
          className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Duration</label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="e.g., 3 months, Full-time"
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Pay</label>
          <input
            type="text"
            value={formData.pay}
            onChange={(e) => setFormData({ ...formData, pay: e.target.value })}
            placeholder="e.g., $20/hour, $5000/month"
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="e.g., San Francisco, CA"
          className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_remote}
            onChange={(e) => setFormData({ ...formData, is_remote: e.target.checked })}
            className="mr-2"
          />
          <span>Remote position</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Job Posting"}
      </button>
    </form>
  );
}

