import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServerClient();

    // Get user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("clerk_user_id", userId)
      .single();

    if (!profile || profile.role !== "student") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { data: studentProfile, error } = await supabase
      .from("student_profiles")
      .select("*")
      .eq("profile_id", profile.id)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching student profile:", error);
      return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }

    return NextResponse.json(studentProfile || { profile_id: profile.id, skills: [], projects: [] });
  } catch (error) {
    console.error("Error in GET /api/student-profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServerClient();

    // Get user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("clerk_user_id", userId)
      .single();

    if (!profile || profile.role !== "student") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { profile_id, skills, bio, availability, resume_url, projects } = body;

    if (profile_id !== profile.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { data: studentProfile, error } = await supabase
      .from("student_profiles")
      .upsert(
        {
          profile_id: profile.id,
          skills: skills || [],
          bio: bio || null,
          availability: availability || null,
          resume_url: resume_url || null,
          projects: projects || [],
          updated_at: new Date().toISOString(),
        },
        { onConflict: "profile_id" }
      )
      .select()
      .single();

    if (error) {
      console.error("Error updating student profile:", error);
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }

    return NextResponse.json(studentProfile);
  } catch (error) {
    console.error("Error in PUT /api/student-profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

