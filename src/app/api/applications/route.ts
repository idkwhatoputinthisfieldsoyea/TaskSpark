import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { getProfileForUser } from "@/lib/profileCache";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServerClient();

    // Get user profile (cached)
    const profile = await getProfileForUser(userId);
    if (!profile || profile.role !== "student") return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const body = await request.json();
    const { job_id, cover_letter } = body;

    // Check if already applied
    const { data: existing } = await supabase
      .from("applications")
      .select("id")
      .eq("job_id", job_id)
      .eq("student_id", profile.id)
      .single();

    if (existing) {
      return NextResponse.json({ error: "Already applied to this job" }, { status: 400 });
    }

    const { data: application, error } = await supabase
      .from("applications")
      .insert({
        job_id,
        student_id: profile.id,
        cover_letter: cover_letter || null,
        status: "applied",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating application:", error);
      return NextResponse.json({ error: "Failed to create application" }, { status: 500 });
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error("Error in POST /api/applications:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("job_id");
    const studentId = searchParams.get("student_id");
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const per_page = Math.min(Number(searchParams.get("per_page") || 20), 100);

    const supabase = createServerClient();

    // Get user profile (cached)
    const profile = await getProfileForUser(userId);
    if (!profile) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    // narrow select to only required fields and join minimal profile/job data
    let query = supabase.from("applications").select(`
      id, job_id, student_id, status, created_at,
      job:jobs(id, title),
      student:profiles!applications_student_id_fkey(id, full_name, email)
    `, { count: "exact" });

    if (profile.role === "student") {
      query = query.eq("student_id", profile.id);
    } else if (jobId) {
      query = query.eq("job_id", jobId);
    } else if (studentId) {
      query = query.eq("student_id", studentId);
    }

    const from = (page - 1) * per_page;
    const to = from + per_page - 1;
    const { data: applications, error, count } = await query.range(from, to as number);

    if (error) {
      console.error("Error fetching applications:", error);
      return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
    }

    return NextResponse.json(applications || [], {
      headers: { "X-Total-Count": String(count || 0) },
    });
  } catch (error) {
    console.error("Error in GET /api/applications:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

