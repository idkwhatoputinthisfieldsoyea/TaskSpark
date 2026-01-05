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
    <div className="bg-dark-surface border border-dark-border rounded-lg p-6 hover:border-purple-600 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-400">
            {job.is_remote && (
              <span className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded">
                Remote
              </span>
            )}
            {job.location && (
              <span className="px-2 py-1 bg-dark-border rounded">{job.location}</span>
            )}
            {job.duration && (
              <span className="px-2 py-1 bg-dark-border rounded">{job.duration}</span>
            )}
            {job.pay && (
              <span className="px-2 py-1 bg-dark-border rounded">{job.pay}</span>
            )}
          </div>
        </div>
        <span className={`px-3 py-1 rounded text-sm ${
          job.status === "active" ? "bg-green-900/30 text-green-300" :
          job.status === "closed" ? "bg-gray-900/30 text-gray-300" :
          "bg-blue-900/30 text-blue-300"
        }`}>
          {job.status}
        </span>
      </div>

      <p className="text-gray-300 mb-4 line-clamp-3">{job.description}</p>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {job.skills_required.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-900/20 text-purple-300 rounded text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">
          Posted {formatDate(job.created_at)}
        </span>
        {showApplyButton && (
          <button
            onClick={handleApply}
            disabled={applying}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {applying ? "Applying..." : "Apply Now"}
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(JobCard);

