import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // runtime env checks before initializing server client
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const supabase = createServerClient();

    // Get user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("clerk_user_id", userId)
      .single();

    if (!profile || profile.role !== "recruiter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { status } = body;

    // Verify recruiter owns the job
    const { data: application } = await supabase
      .from("applications")
      .select("job:jobs!inner(recruiter_id)")
      .eq("id", params.id)
      .single();

    if (!application || (application.job as any).recruiter_id !== profile.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { data: updatedApplication, error } = await supabase
      .from("applications")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating application:", error);
      return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
    }

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error("Error in PATCH /api/applications/[id]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

