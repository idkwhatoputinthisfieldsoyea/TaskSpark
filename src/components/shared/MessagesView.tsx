"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Message, Profile } from "@/types/database";
import { formatDate } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

interface MessagesViewProps {
  profileId: string;
  receiverId?: string;
  jobId?: string;
}

interface MessageWithUsers extends Message {
  sender: Profile;
  receiver: Profile;
}

export default function MessagesView({
  profileId,
  receiverId,
  jobId,
}: MessagesViewProps) {
  const [messages, setMessages] = useState<MessageWithUsers[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // if a receiverId prop is not provided, allow selecting a conversation locally
  const [activeReceiver, setActiveReceiver] = useState<string | undefined>(receiverId);
  const [conversations, setConversations] = useState<Array<{ id: string; name?: string; last?: string }>>([]);

  const fetchMessages = useCallback(async () => {
    try {
      let url = "/api/messages";
      const params = new URLSearchParams();
      const targetReceiver = activeReceiver || receiverId;
      if (targetReceiver) params.append("receiver_id", targetReceiver);
      if (jobId) params.append("job_id", jobId);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);

        // Build conversation list only when not viewing a specific thread
        if (!receiverId && !activeReceiver) {
          const map = new Map<string, { id: string; name?: string; last?: string }>();
          for (const m of data as MessageWithUsers[]) {
            const otherId = m.sender_id === profileId ? m.receiver_id : m.sender_id;
            const otherName = (m.sender_id === profileId ? m.receiver?.full_name : m.sender?.full_name) ?? undefined;
            const existing = map.get(otherId) || { id: otherId, name: otherName as string | undefined, last: '' };
            existing.name = existing.name || otherName;
            existing.last = m.content;
            map.set(otherId, existing);
          }
          const arr = Array.from(map.values());
          setConversations(arr);

          // auto-open the most recent conversation so users can send immediately
          if (arr.length > 0) {
            setActiveReceiver((prev) => prev || arr[0].id);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  }, [receiverId, jobId, activeReceiver, profileId]);

  // refresh when activeReceiver/receiverId/jobId change
  useEffect(() => {
    setLoading(true);
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMessages, activeReceiver, receiverId, jobId]);

  useEffect(() => {
    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages", filter: `or(sender_id.eq.${profileId},receiver_id.eq.${profileId})` },
        (payload) => {
          const candidate = (payload.new || payload.old) as Partial<Message> | null;
          if (!candidate || !("id" in candidate)) return;
          const msg = candidate as Message;

          const targetReceiver = activeReceiver || receiverId;
          const involvesReceiver = targetReceiver ? msg.sender_id === targetReceiver || msg.receiver_id === targetReceiver : true;
          const involvesJob = jobId ? String(msg.job_id) === String(jobId) : true;

          // update conversation list when not viewing a thread
          if (!targetReceiver) {
            setConversations((prev) => {
              const otherId = msg.sender_id === profileId ? msg.receiver_id : msg.sender_id;
              const idx = prev.findIndex((c) => c.id === otherId);
              const otherName = msg.sender_id === profileId
                ? ((msg as any).receiver?.full_name ?? prev[idx]?.name)
                : ((msg as any).sender?.full_name ?? prev[idx]?.name);
              const newEntry = { id: otherId, name: otherName as string | undefined, last: msg.content };
              if (idx === -1) return [newEntry, ...prev];
              const copy = [...prev];
              copy[idx] = newEntry;
              copy.splice(idx, 1);
              return [newEntry, ...copy];
            });
          }

          if (involvesReceiver && involvesJob) {
            setMessages((prev) => {
              if (payload.eventType === "INSERT") return [...prev, msg as MessageWithUsers];
              if (payload.eventType === "UPDATE") return prev.map((m) => (m.id === msg.id ? (msg as MessageWithUsers) : m));
              if (payload.eventType === "DELETE") return prev.filter((m) => m.id !== msg.id);
              return prev;
            });
          }
        }
      )
      .subscribe();

    return () => {
      try {
        channel.unsubscribe();
      } catch (e) {
        // ignore
      }
    };
  }, [profileId, activeReceiver, receiverId, jobId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetReceiver = activeReceiver || receiverId;
    if (!newMessage.trim()) return;
    if (!targetReceiver) {
      alert("Select a conversation before sending a message.");
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiver_id: targetReceiver,
          job_id: jobId || null,
          content: newMessage,
        }),
      });

      if (response.ok) {
        const created = await response.json();
        // optimistic update: append created message and clear input
        setMessages((prev) => [...prev, created]);
        setNewMessage("");
      } else {
        const text = await response.text();
        console.error("Send message failed:", response.status, text);
        alert("Failed to send message: " + (text || response.status));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending the message");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400">Loading messages...</div>;
  }

  // When no receiverId prop provided, render conversation list + thread
  return (
    <div className="flex flex-col md:flex-row h-[600px] bg-dark-surface border border-dark-border rounded-lg overflow-hidden">
      {/* Conversations list (left) */}
      <div className="w-full md:w-1/3 border-r border-dark-border bg-black/30 p-4 overflow-y-auto">
        <div className="text-sm text-gray-400 mb-4">Conversations</div>
        {conversations.length === 0 ? (
          <div className="text-gray-400">No conversations yet.</div>
        ) : (
          conversations.map((c) => (
            <button key={c.id} onClick={() => { setActiveReceiver(c.id); setMessages([]); }} className="w-full text-left py-3 px-2 rounded hover:bg-white/5 flex justify-between items-center">
              <div>
                <div className="font-medium">{c.name || 'Unknown'}</div>
                <div className="text-xs text-gray-400 truncate max-w-xs">{c.last}</div>
              </div>
              <div className="text-xs text-gray-400">&gt;</div>
            </button>
          ))
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No messages in this conversation.</div>
          ) : (
            messages.map((message) => {
              // derive sender id robustly (sender_id is source-of-truth, fall back to joined sender)
              const senderId = message.sender_id ?? (message.sender && (message.sender as any).id) ?? null;
              const isSender = !!profileId && senderId === profileId;

              const bubbleClass = isSender
                ? "max-w-[70%] rounded-lg p-3 bg-purple-600 text-white shadow-md rounded-bl-lg rounded-tl-lg"
                : "max-w-[70%] rounded-lg p-3 bg-gray-800 text-gray-100 border border-gray-700 shadow-sm rounded-br-lg rounded-tr-lg";

              return (
                <div key={message.id} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
                  <div className={bubbleClass}>
                    {/* ownership label */}
                    {isSender ? (
                      <div className="text-xs text-right text-purple-100 font-semibold mb-1">You</div>
                    ) : (
                      <div className="text-xs text-left text-gray-300 font-semibold mb-1">{(message.sender && (message.sender as any).full_name) || 'Unknown'}</div>
                    )}

                    <p className="text-sm break-words">{message.content}</p>
                    <p className={`text-xs mt-1 ${isSender ? "text-purple-200" : "text-gray-400"}`}>{formatDate(message.created_at)}</p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className="border-t border-dark-border p-4 flex-shrink-0">
          <div className="flex gap-2">
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600" />
            <button type="submit" disabled={sending || !newMessage.trim() || !(activeReceiver || receiverId) || !profileId} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}

