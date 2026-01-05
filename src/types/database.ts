export interface Profile {
  id: string;
  clerk_user_id: string;
  role: 'student' | 'recruiter';
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface StudentProfile {
  id: string;
  profile_id: string;
  skills: string[];
  projects: Project[];
  resume_url: string | null;
  availability: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id?: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github_url?: string;
}

export interface Job {
  id: string;
  recruiter_id: string;
  title: string;
  description: string;
  skills_required: string[];
  duration: string | null;
  pay: string | null;
  location: string | null;
  is_remote: boolean;
  status: 'active' | 'closed' | 'filled';
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  job_id: string;
  student_id: string;
  status: 'applied' | 'reviewed' | 'accepted' | 'rejected';
  cover_letter: string | null;
  created_at: string;
  updated_at: string;
}

export interface Offer {
  id: string;
  application_id: string;
  offer_details: Record<string, any>;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  job_id: string | null;
  content: string;
  is_read: boolean;
  created_at: string;
}

