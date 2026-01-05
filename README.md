# Techspark

A modern job platform connecting students with recruiters and opportunities. Built with Next.js, TypeScript, Clerk authentication, and Supabase.

## Features

### For Students
- Create and manage profile with skills, projects, and availability
- Browse job feed with search and filtering
- Apply to jobs
- Track application status
- Accept/decline job offers
- Message with recruiters

### For Recruiters
- Create and manage job postings
- View applicants per job
- Accept/reject candidates
- Message with students
- Manage job status

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk (OAuth)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (recommended)

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- Supabase account and project
- Clerk account

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory (you can copy from `env.example`):

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cGlja2VkLXJhdHRsZXItNDYuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_BqSSKFIihALWHrii7lVIP6rAoejzDKbR7COl6CWQQE

# Get these from your Supabase project settings (Dashboard > Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=sb_secret_5wkWCBx7sR3_BqGQx_jzOA_QdJVfAyO
```

**Note**: You need to get `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your Supabase project dashboard (Settings > API section).

### 4. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `database-schema.sql`
4. This will create all necessary tables, indexes, and basic RLS policies

**Important**: You'll need to configure Row Level Security (RLS) policies properly to integrate with Clerk. The current schema includes basic RLS setup, but you may need to adjust it based on your authentication setup.

### 5. Clerk Configuration

1. In your Clerk dashboard, make sure to add the following environment URLs:
   - Development: `http://localhost:3000`
   - Production: Your production URL

2. Configure OAuth providers if needed

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # Dashboard pages
│   │   └── ...
│   ├── components/            # React components
│   │   ├── dashboards/       # Dashboard components
│   │   ├── layout/           # Layout components
│   │   ├── recruiter/        # Recruiter-specific components
│   │   ├── shared/           # Shared components
│   │   └── student/          # Student-specific components
│   ├── lib/                  # Utility libraries
│   └── types/                # TypeScript types
├── database-schema.sql        # Database schema
└── ...
```

## API Routes

- `POST /api/profile/create` - Create user profile
- `GET /api/jobs` - Get jobs (with optional recruiter_id filter)
- `POST /api/jobs` - Create job posting
- `POST /api/applications` - Apply to a job
- `GET /api/applications` - Get applications
- `PATCH /api/applications/[id]` - Update application status
- `GET /api/messages` - Get messages
- `POST /api/messages` - Send message
- `PUT /api/student-profile` - Update student profile

## Database Schema

The application uses the following main tables:

- `profiles` - User profiles with role (student/recruiter)
- `student_profiles` - Extended student information
- `jobs` - Job postings
- `applications` - Job applications
- `offers` - Job offers
- `messages` - Messages between users

See `database-schema.sql` for the complete schema.

## Security Notes

1. **Row Level Security (RLS)**: The database schema includes basic RLS policies. You should review and customize them based on your security requirements.

2. **API Authentication**: All API routes check for authenticated users using Clerk's `auth()` function.

3. **Role-Based Access**: The application enforces role-based access control (student vs recruiter) at the API level.

## Next Steps

1. Customize the UI/UX to match your brand
2. Add email notifications
3. Implement file upload for resumes
4. Add search and filtering enhancements
5. Implement real-time messaging with WebSockets
6. Add analytics and reporting features
7. Configure proper RLS policies for production
8. Set up CI/CD pipeline

## License

MIT

# TaskSpark-Main
# TaskSpark-Main
