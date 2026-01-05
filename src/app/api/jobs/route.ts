import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { getProfileForUser } from "@/lib/profileCache";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const recruiterId = searchParams.get("recruiter_id");
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const per_page = Math.min(Number(searchParams.get("per_page") || 20), 100);
    const search = searchParams.get("search");
    const skills = searchParams.get("skills");

    const supabase = createServerClient();
    let base = supabase
      .from("jobs")
      .select("id, recruiter_id, title, description, skills_required, duration, pay, location, is_remote, status, created_at", { count: "exact" })
      .order("created_at", { ascending: false });

    if (recruiterId) base = base.eq("recruiter_id", recruiterId);
    if (search) {
      // simple ILIKE search on title or description
      base = base.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }
    if (skills) {
      // expects comma-separated skills, use contains for array match
      const skillArr = skills.split(",").map((s) => s.trim()).filter(Boolean);
      if (skillArr.length > 0) base = base.contains("skills_required", skillArr);
    }

    const from = (page - 1) * per_page;
    const to = from + per_page - 1;

    const { data: jobs, error, count } = await base.range(from, to as number);

    if (error) {
      console.error("Error fetching jobs:", error);
      return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }

    return NextResponse.json(jobs || [], {
      headers: { "X-Total-Count": String(count || 0) },
    });
  } catch (error) {
    console.error("Error in GET /api/jobs:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServerClient();
    const profile = await getProfileForUser(userId);
    if (!profile || profile.role !== "recruiter") return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const body = await request.json();
    const { title, description, skills_required, duration, pay, location, is_remote } = body;

    const { data: job, error } = await supabase
      .from("jobs")
      .insert({
        recruiter_id: profile.id,
        title,
        description,
        skills_required: skills_required || [],
        duration,
        pay,
        location,
        is_remote: is_remote || false,
        status: "active",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating job:", error);
      return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error in POST /api/jobs:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

