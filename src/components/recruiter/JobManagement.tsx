"use client";

import { useEffect, useState, useCallback } from "react";
import { Job } from "@/types/database";
import JobCard from "@/components/shared/JobCard";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface JobManagementProps {
  recruiterId: string;
}

export default function JobManagement({ recruiterId }: JobManagementProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  // applicant counts state
  const [applicantCounts, setApplicantCounts] = useState<Record<string, number>>({});

  const fetchJobs = useCallback(async () => {
    try {
      const response = await fetch(`/api/jobs?recruiter_id=${recruiterId}`);
      if (response.ok) {
        const data = await response.json();
        setJobs(data || []);

        // batch fetch counts for all jobs
        const jobIds = (data || []).map((j: Job) => j.id);
        if (jobIds.length > 0) {
          const q = new URLSearchParams();
          q.append("job_ids", jobIds.join(','));
          const rc = await fetch(`/api/applications/counts?${q.toString()}`);
          if (rc.ok) {
            const counts = await rc.json();
            setApplicantCounts(counts || {});
          }
        }
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }, [recruiterId]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    const jobsChannel = supabase
      .channel("public:jobs")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "jobs", filter: `recruiter_id=eq.${recruiterId}` },
        (payload) => {
          const candidate = (payload.new || payload.old) as Partial<Job> | null;
          if (!candidate || !('id' in candidate)) return;
          const job = candidate as Job;
          setJobs((prev) => {
            if (payload.eventType === "INSERT") return [job, ...prev];
            if (payload.eventType === "UPDATE") return prev.map((j) => (j.id === job.id ? job : j));
            if (payload.eventType === "DELETE") return prev.filter((j) => j.id !== job.id);
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      try {
        jobsChannel.unsubscribe();
      } catch {}
    };
  }, []);

  // subscribe to application events only for current job ids
  useEffect(() => {
    if (!jobs || jobs.length === 0) return;
    const jobIds = jobs.map((j) => j.id).join(',');
    const appsChannel = supabase
      .channel('public:applications')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'applications', filter: `job_id=in.(${jobIds})` },
        (payload) => {
          const appCandidate = (payload.new || payload.old) as Partial<{ job_id?: string }> | null;
          if (!appCandidate || !('job_id' in appCandidate) || !appCandidate.job_id) return;
          const app = appCandidate as { job_id: string };

          setApplicantCounts((prev) => {
            const next = { ...prev };
            const jobId = app.job_id;

            if (payload.eventType === 'INSERT') {
              next[jobId] = (next[jobId] || 0) + 1;
            } else if (payload.eventType === 'DELETE') {
              next[jobId] = Math.max(0, (next[jobId] || 1) - 1);
            }

            return next;
          });
        }
      )
      .subscribe();

    return () => {
      try {
        appsChannel.unsubscribe();
      } catch {}
    };
  }, [jobs]);

  if (loading) {
    return <div className="text-center text-gray-400">Loading jobs...</div>;
  }

  return (
    <div className="space-y-4">
      {jobs.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <p className="mb-4">No jobs posted yet.</p>
          <Link
            href="/dashboard/create-job"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors inline-block"
          >
            Create Your First Job
          </Link>
        </div>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="relative">
            <JobCard job={job} showApplyButton={false} />
                <div className="absolute top-6 right-6 flex gap-2 items-center">
                  <span className="px-2 py-1 bg-dark-border text-sm rounded text-gray-200">
                    {(applicantCounts[job.id] || 0)} applicants
                  </span>
                  <Link
                    href={`/dashboard/jobs/${job.id}/applicants`}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition-colors"
                  >
                    View Applicants
                  </Link>
                </div>
          </div>
        ))
      )}
    </div>
  );
}

