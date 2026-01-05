import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { clerk_user_id, email, full_name, role } = body;

    console.log("Profile creation request:", { userId, clerk_user_id, email, full_name, role });

    // Validate required fields
    if (!clerk_user_id || !email || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (clerk_user_id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const supabase = createServerClient();

    // Create profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .insert({
        clerk_user_id,
        email,
        full_name,
        role,
      })
      .select()
      .single();

    if (profileError) {
      console.error("Error creating profile:", profileError);
      console.error("Profile error details:", {
        message: profileError.message,
        details: profileError.details,
        hint: profileError.hint,
        code: profileError.code
      });
      return NextResponse.json({ error: "Failed to create profile", details: profileError.message }, { status: 500 });
    }

    // If student, create student profile
    if (role === "student") {
      const { error: studentProfileError } = await supabase
        .from("student_profiles")
        .insert({
          profile_id: profile.id,
          skills: [],
          projects: [],
        });

      if (studentProfileError) {
        console.error("Error creating student profile:", studentProfileError);
        // Don't fail the entire request if student profile creation fails
        // The main profile was created successfully
      }
    }

    return NextResponse.json({ profile });
  } catch (error: any) {
    console.error("Error in profile creation:", error);
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
  }
}
