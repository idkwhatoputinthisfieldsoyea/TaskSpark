import DashboardLayout from "@/components/layout/DashboardLayout";
import JobManagement from "@/components/recruiter/JobManagement";

interface RecruiterDashboardProps {
  userId: string;
  profileId: string;
}

export default function RecruiterDashboard({ userId, profileId }: RecruiterDashboardProps) {
  return (
    <DashboardLayout role="recruiter">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Job Management</h1>
          <a
            href="/dashboard/create-job"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Create Job
          </a>
        </div>
        <JobManagement recruiterId={profileId} />
      </div>
    </DashboardLayout>
  );
}

