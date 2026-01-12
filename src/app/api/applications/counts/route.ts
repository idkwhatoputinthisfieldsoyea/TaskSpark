import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

// This route reads request headers via `auth()` and must be dynamic.
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const jobIdsParam = searchParams.get("job_ids");
    if (!jobIdsParam) return NextResponse.json({});

    const jobIds = jobIdsParam.split(",").map((s) => s.trim()).filter(Boolean);
    if (jobIds.length === 0) return NextResponse.json({});

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("applications")
      .select("job_id")
      .in("job_id", jobIds);

    if (error) {
      console.error("Error fetching application counts:", error);
      return NextResponse.json({ error: "Failed" }, { status: 500 });
    }

    const counts: Record<string, number> = {};
    for (const j of jobIds) counts[j] = 0;
    (data || []).forEach((r: any) => {
      counts[r.job_id] = (counts[r.job_id] || 0) + 1;
    });

    return NextResponse.json(counts);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal" }, { status: 500 });
  }
}
