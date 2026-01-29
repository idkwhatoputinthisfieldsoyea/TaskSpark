import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { getProfileForUser } from "@/lib/profileCache";

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const receiverId = searchParams.get("receiver_id");
    const jobId = searchParams.get("job_id");

    const supabase = createServerClient();

    // Get user profile (cached)
    const profile = await getProfileForUser(userId);
    if (!profile) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    let query;
    
    if (receiverId) {
      // Filter to only messages between the user and the specific receiver
      query = supabase
        .from("messages")
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(id, full_name, email),
          receiver:profiles!messages_receiver_id_fkey(id, full_name, email)
        `)
        .or(
          `and(sender_id.eq.${profile.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${profile.id})`
        )
        .order("created_at", { ascending: true });
    } else {
      // Get all messages involving this user
      query = supabase
        .from("messages")
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(id, full_name, email),
          receiver:profiles!messages_receiver_id_fkey(id, full_name, email)
        `)
        .or(`sender_id.eq.${profile.id},receiver_id.eq.${profile.id}`)
        .order("created_at", { ascending: true });
    }

    // Only filter by job_id if explicitly provided and not empty
    if (jobId && jobId !== "null" && jobId !== "undefined") {
      query = query.eq("job_id", jobId);
    }

    const { data: messages, error } = await query;

    if (error) {
      console.error("Error fetching messages:", error);
      return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }

    return NextResponse.json(messages || []);
  } catch (error) {
    console.error("Error in GET /api/messages:", error);
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

    // Get user profile (cached)
    const profile = await getProfileForUser(userId);
    if (!profile) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const body = await request.json();
    const { receiver_id, job_id, content } = body;

    const { data: message, error } = await supabase
      .from("messages")
      .insert({
        sender_id: profile.id,
        receiver_id,
        job_id: job_id || null,
        content,
        is_read: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating message:", error);
      return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error("Error in POST /api/messages:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createServerClient();

    // Get user profile (cached)
    const profile = await getProfileForUser(userId);
    if (!profile) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const body = await request.json();
    const { message_ids, is_read } = body;

    if (!message_ids || !Array.isArray(message_ids)) {
      return NextResponse.json({ error: "message_ids array required" }, { status: 400 });
    }

    // Only allow marking messages as read if the user is the receiver
    const { data, error } = await supabase
      .from("messages")
      .update({ is_read: is_read ?? true })
      .in("id", message_ids)
      .eq("receiver_id", profile.id)
      .select();

    if (error) {
      console.error("Error updating messages:", error);
      return NextResponse.json({ error: "Failed to update messages" }, { status: 500 });
    }

    return NextResponse.json({ updated: data?.length || 0 });
  } catch (error) {
    console.error("Error in PATCH /api/messages:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

