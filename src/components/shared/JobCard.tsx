"use client";

import React, { useState } from "react";
import { Job } from "@/types/database";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface JobCardProps {
  job: Job;
  showApplyButton?: boolean;
}

const JobCard = ({ job, showApplyButton = false }: JobCardProps) => {
  const [applying, setApplying] = useState(false);

  const handleApply = async () => {
    setApplying(true);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id: job.id }),
      });

      if (response.ok) {
        alert("Application submitted successfully!");
      } else {
        alert("Failed to submit application. You may have already applied.");
      }
    } catch (error) {
      console.error("Error applying:", error);
      alert("An error occurred while submitting your application.");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg p-6 hover:border-blue-600 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">{job.title}</h3>
          <div className="flex flex-wrap gap-2 text-sm text-slate-600">
            {job.is_remote && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                Remote
              </span>
            )}
            {job.location && (
              <span className="px-2 py-1 bg-slate-100 rounded">{job.location}</span>
            )}
            {job.duration && (
              <span className="px-2 py-1 bg-slate-100 rounded">{job.duration}</span>
            )}
            {job.pay && (
              <span className="px-2 py-1 bg-slate-100 rounded">{job.pay}</span>
            )}
          </div>
        </div>
        <span className={`px-3 py-1 rounded text-sm ${
          job.status === "active" ? "bg-green-100 text-green-700" :
          job.status === "closed" ? "bg-slate-100 text-slate-700" :
          "bg-blue-100 text-blue-700"
        }`}>
          {job.status}
        </span>
      </div>

      <p className="text-slate-700 mb-4 line-clamp-3">{job.description}</p>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {job.skills_required.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-500">
          Posted {formatDate(job.created_at)}
        </span>
        {showApplyButton && (
          <button
            onClick={handleApply}
            disabled={applying}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {applying ? "Applying..." : "Apply Now"}
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(JobCard);

