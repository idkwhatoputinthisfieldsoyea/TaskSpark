"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StudentProfile, Project } from "@/types/database";

interface StudentProfileFormProps {
  profileId: string;
  initialData?: StudentProfile | null;
}

export default function StudentProfileForm({
  profileId,
  initialData,
}: StudentProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    skills: (initialData?.skills && Array.isArray(initialData.skills) 
      ? initialData.skills.join(", ") 
      : "") || "",
    bio: initialData?.bio || "",
    availability: initialData?.availability || "",
    resume_url: initialData?.resume_url || "",
    projects: (initialData?.projects || []) as Project[],
  });

  const [newProject, setNewProject] = useState<{
    name: string;
    description: string;
    technologies: string;
    url?: string;
    github_url?: string;
  }>({
    name: "",
    description: "",
    technologies: "",
    url: "",
    github_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const skillsArray = formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const payload = {
        profile_id: profileId,
        skills: skillsArray,
        bio: formData.bio,
        availability: formData.availability,
        resume_url: formData.resume_url,
        projects: formData.projects,
      };

      console.debug("Submitting student profile:", payload);

      const response = await fetch("/api/student-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let bodyText = null;
      try {
        bodyText = await response.text();
      } catch (e) {
        bodyText = null;
      }

      if (response.ok) {
        console.debug("Profile update response:", bodyText);
        alert("Profile updated successfully!");
        try { router.refresh(); } catch (e) { /* ignore in non-next env */ }
      } else {
        console.error("Failed to update profile", response.status, bodyText);
        // try to parse JSON error message
        try {
          const json = bodyText ? JSON.parse(bodyText) : null;
          alert("Failed to update profile: " + (json?.error || bodyText || response.status));
        } catch (e) {
          alert("Failed to update profile: " + (bodyText || response.status));
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile");
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  const addProject = () => {
    if (!newProject.name || !newProject.description) return;

    const technologiesArray = newProject.technologies
      ?.split(",")
      .map((t: string) => t.trim())
      .filter((t: string) => t.length > 0) || [];

    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          name: newProject.name,
          description: newProject.description,
          technologies: technologiesArray,
          url: newProject.url,
          github_url: newProject.github_url,
        },
      ],
    });

    setNewProject({
      name: "",
      description: "",
      technologies: "",
      url: "",
      github_url: "",
    });
  };

  const removeProject = (index: number) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-dark-surface border border-dark-border rounded-lg p-6">
      <div>
        <label className="block text-sm font-medium mb-2">Skills (comma-separated)</label>
        <input
          type="text"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          placeholder="e.g., React, TypeScript, Python"
          className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Bio</label>
        <textarea
          rows={4}
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Availability</label>
        <input
          type="text"
          value={formData.availability}
          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
          placeholder="e.g., Available immediately, Part-time 20hrs/week"
          className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Resume URL</label>
        <input
          type="url"
          value={formData.resume_url}
          onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
          placeholder="https://..."
          className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-4">Projects</label>
        
        <div className="space-y-4 mb-4">
          {formData.projects.map((project, index) => (
            <div key={index} className="bg-dark-bg border border-dark-border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-slate-900">{project.name}</h4>
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              </div>
              <p className="text-slate-600 text-sm mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border border-dark-border rounded-lg p-4 space-y-3">
          <input
            type="text"
            placeholder="Project Name"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <textarea
            rows={2}
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="text"
            placeholder="Technologies (comma-separated)"
            value={newProject.technologies}
            onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
            className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="url"
              placeholder="Project URL"
              value={newProject.url}
              onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="url"
              placeholder="GitHub URL"
              value={newProject.github_url}
              onChange={(e) => setNewProject({ ...newProject, github_url: e.target.value })}
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="button"
            onClick={addProject}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
          >
            Add Project
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}

