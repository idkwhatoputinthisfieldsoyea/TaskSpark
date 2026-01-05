"use client";

import { useEffect, useState, useCallback } from "react";
import { Application, Profile } from "@/types/database";
import { formatDate } from "@/lib/utils";

interface ApplicantListProps {
  jobId: string;
}

interface ApplicationWithStudent extends Application {
  student: Profile;
  job?: any;
}

export default function ApplicantList({ jobId }: ApplicantListProps) {
  const [applications, setApplications] = useState<ApplicationWithStudent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = useCallback(async () => {
    try {
      const response = await fetch(`/api/applications?job_id=${jobId}`);
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchApplications();
      } else {
        alert("Failed to update application status");
      }
    } catch (error) {
      console.error("Error updating application:", error);
      alert("An error occurred while updating the application");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400">Loading applicants...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        No applicants yet for this job posting.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <div
          key={application.id}
          className="bg-dark-surface border border-dark-border rounded-lg p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {(application.student as any)?.full_name || "Unknown"}
              </h3>
              <p className="text-gray-400 text-sm">
                {(application.student as any)?.email}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded text-sm ${
                application.status === "applied"
                  ? "bg-blue-900/30 text-blue-300"
                  : application.status === "reviewed"
                  ? "bg-yellow-900/30 text-yellow-300"
                  : application.status === "accepted"
                  ? "bg-green-900/30 text-green-300"
                  : "bg-red-900/30 text-red-300"
              }`}
            >
              {application.status}
            </span>
          </div>

          {application.cover_letter && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Cover Letter:</h4>
              <p className="text-gray-400 text-sm whitespace-pre-wrap">
                {application.cover_letter}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">
              Applied {formatDate(application.created_at)}
            </span>
            <div className="flex gap-2">
              {application.status === "applied" && (
                <>
                  <button
                    onClick={() => updateApplicationStatus(application.id, "reviewed")}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded transition-colors"
                  >
                    Mark as Reviewed
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(application.id, "accepted")}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(application.id, "rejected")}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                  >
                    Reject
                  </button>
                </>
              )}
              {application.status === "reviewed" && (
                <>
                  <button
                    onClick={() => updateApplicationStatus(application.id, "accepted")}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(application.id, "rejected")}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                  >
                    Reject
                  </button>
                </>
              )}
              <a
                href={`/dashboard/messages?receiver_id=${application.student_id}`}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition-colors"
              >
                Message
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

