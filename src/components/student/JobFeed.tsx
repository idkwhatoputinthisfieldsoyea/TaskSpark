"use client";

import { useEffect, useState } from "react";
import { Job } from "@/types/database";
import JobCard from "@/components/shared/JobCard";
import { getBrowserClient } from "@/lib/supabase";

export default function JobFeed() {
  const supabase = getBrowserClient();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchJobs();
  }, [page]);

  // debounce search/skill filters
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      fetchJobs();
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, skillFilter]);

  useEffect(() => {
    const channel = supabase
      .channel("public:jobs")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "jobs", filter: `status=eq.active` },
        (payload) => {
          const candidate = (payload.new || payload.old) as Partial<Job> | null;
          if (!candidate || !('id' in candidate)) return;
          const job = candidate as Job;

          setJobs((prev) => {
            if (payload.eventType === "INSERT") {
              return [job, ...prev];
            }

            if (payload.eventType === "UPDATE") {
              return prev.map((j) => (j.id === job.id ? job : j));
            }

            if (payload.eventType === "DELETE") {
              return prev.filter((j) => j.id !== job.id);
            }

            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      try {
        channel.unsubscribe();
      } catch (e) {
        // ignore
      }
    };
  }, []);

  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams();
      params.append("page", String(page));
      params.append("per_page", "20");
      if (searchTerm) params.append("search", searchTerm);
      if (skillFilter) params.append("skills", skillFilter);

      const response = await fetch(`/api/jobs?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setJobs(data || []);
        const totalCount = response.headers.get("X-Total-Count");
        setTotal(totalCount ? Number(totalCount) : 0);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => job.status === "active");

  if (loading) {
    return <div className="text-center text-gray-400">Loading jobs...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="text"
          placeholder="Filter by skill..."
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          className="flex-1 px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No jobs found. Try adjusting your search filters.
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} showApplyButton={true} />
          ))
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-400">Showing {(page-1)*20 + 1} - {Math.min(page*20, total)} of {total}</div>
        <div className="flex gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p-1))} className="px-3 py-1 bg-dark-border rounded">Prev</button>
          <button onClick={() => setPage((p) => p+1)} className="px-3 py-1 bg-dark-border rounded">Next</button>
        </div>
      </div>
    </div>
  );
}

