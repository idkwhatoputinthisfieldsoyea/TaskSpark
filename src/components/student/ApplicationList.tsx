"use client";

import { useEffect, useState, useCallback } from "react";
import { Application, Job } from "@/types/database";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface ApplicationListProps {
  studentId: string;
}

interface ApplicationWithJob extends Application {
  job: Job;
}

export default function ApplicationList({ studentId }: ApplicationListProps) {
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = useCallback(async () => {
    try {
      const response = await fetch("/api/applications");
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  if (loading) {
    return <div className="text-center text-slate-500">Loading applications...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="text-center text-slate-500 py-12">
        <p className="mb-4">You haven&apos;t applied to any jobs yet.</p>
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors inline-block"
        >
          Browse Jobs
        </Link>
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
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {(application.job as any)?.title}
              </h3>
              <p className="text-slate-600 text-sm mb-2">
                {(application.job as any)?.description?.substring(0, 150)}...
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded text-sm ${
                application.status === "applied"
                  ? "bg-blue-50 text-blue-700"
                  : application.status === "reviewed"
                  ? "bg-yellow-50 text-yellow-700"
                  : application.status === "accepted"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {application.status}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">
              Applied {formatDate(application.created_at)}
            </span>
            <Link
              href={`/dashboard/messages?job_id=${application.job_id}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            >
              Message Recruiter
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

