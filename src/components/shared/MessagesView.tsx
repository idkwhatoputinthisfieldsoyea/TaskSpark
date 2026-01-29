"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Message, Profile } from "@/types/database";
import { formatDate } from "@/lib/utils";
import { getBrowserClient } from "@/lib/supabase";

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
  // client-side Supabase instance
  const supabase = getBrowserClient();
  const [messages, setMessages] = useState<MessageWithUsers[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // if a receiverId prop is not provided, allow selecting a conversation locally
  const [activeReceiver, setActiveReceiver] = useState<string | undefined>(receiverId);
  const [conversations, setConversations] = useState<Array<{ id: string; name?: string; last?: string }>>([]);

  // Sync activeReceiver with receiverId prop when it changes
  useEffect(() => {
    if (receiverId) {
      setActiveReceiver(receiverId);
    }
  }, [receiverId]);

  const fetchMessages = useCallback(async () => {
    try {
      // First, fetch ALL messages for the user to build conversation list
      const allMessagesResponse = await fetch("/api/messages");
      let allMessages: MessageWithUsers[] = [];
      if (allMessagesResponse.ok) {
        allMessages = await allMessagesResponse.json();
        
        // Build conversation list from all messages
        const map = new Map<string, { id: string; name?: string; last?: string }>();
        for (const m of allMessages) {
          const otherId = m.sender_id === profileId ? m.receiver_id : m.sender_id;
          const otherName = (m.sender_id === profileId ? m.receiver?.full_name : m.sender?.full_name) ?? undefined;
          const existing = map.get(otherId) || { id: otherId, name: otherName as string | undefined, last: '' };
          existing.name = existing.name || otherName;
          existing.last = m.content;
          map.set(otherId, existing);
        }
        const arr = Array.from(map.values());
        setConversations(arr);

        // Auto-open the most recent conversation if no receiver selected
        if (arr.length > 0 && !activeReceiver && !receiverId) {
          setActiveReceiver(arr[0].id);
        }
      }

      // Now filter messages for the active conversation
      const targetReceiver = activeReceiver || receiverId;
      if (targetReceiver) {
        const filteredMessages = allMessages.filter(m => 
          (m.sender_id === profileId && m.receiver_id === targetReceiver) ||
          (m.sender_id === targetReceiver && m.receiver_id === profileId)
        );
        // If jobId is specified, further filter
        if (jobId) {
          const jobFilteredMessages = filteredMessages.filter(m => m.job_id === jobId);
          setMessages(jobFilteredMessages);
        } else {
          setMessages(filteredMessages);
        }
      } else {
        setMessages(allMessages);
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

  // Polling fallback for real-time updates (every 3 seconds)
  useEffect(() => {
    const pollInterval = setInterval(() => {
      // Silent fetch without loading state
      (async () => {
        try {
          const allMessagesResponse = await fetch("/api/messages");
          if (allMessagesResponse.ok) {
            const allMessages: MessageWithUsers[] = await allMessagesResponse.json();
            
            // Update conversation list
            const map = new Map<string, { id: string; name?: string; last?: string }>();
            for (const m of allMessages) {
              const otherId = m.sender_id === profileId ? m.receiver_id : m.sender_id;
              const otherName = (m.sender_id === profileId ? m.receiver?.full_name : m.sender?.full_name) ?? undefined;
              const existing = map.get(otherId) || { id: otherId, name: otherName as string | undefined, last: '' };
              existing.name = existing.name || otherName;
              existing.last = m.content;
              map.set(otherId, existing);
            }
            setConversations(Array.from(map.values()));

            // Filter for active conversation
            const targetReceiver = activeReceiver || receiverId;
            if (targetReceiver) {
              let filteredMessages = allMessages.filter(m => 
                (m.sender_id === profileId && m.receiver_id === targetReceiver) ||
                (m.sender_id === targetReceiver && m.receiver_id === profileId)
              );
              if (jobId) {
                filteredMessages = filteredMessages.filter(m => m.job_id === jobId);
              }
              setMessages(filteredMessages);
            } else {
              setMessages(allMessages);
            }
          }
        } catch (e) {
          // Silent fail for polling
        }
      })();
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [profileId, activeReceiver, receiverId, jobId]);

  useEffect(() => {
    // Subscribe to messages where the user is the sender
    const senderChannel = supabase
      .channel(`messages-sender-${profileId}-${Date.now()}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `sender_id=eq.${profileId}` },
        handleRealtimeMessage
      )
      .subscribe((status) => {
        console.log("Sender channel status:", status);
      });

    // Subscribe to messages where the user is the receiver
    const receiverChannel = supabase
      .channel(`messages-receiver-${profileId}-${Date.now()}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `receiver_id=eq.${profileId}` },
        handleRealtimeMessage
      )
      .subscribe((status) => {
        console.log("Receiver channel status:", status);
      });

    function handleRealtimeMessage(payload: any) {
      const candidate = (payload.new || payload.old) as Partial<Message> | null;
      if (!candidate || !("id" in candidate)) return;
      const msg = candidate as Message;

      // Check if this message involves the current user
      if (msg.sender_id !== profileId && msg.receiver_id !== profileId) return;

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
          if (payload.eventType === "INSERT") {
            // Avoid duplicates
            if (prev.some((m) => m.id === msg.id)) return prev;
            return [...prev, msg as MessageWithUsers];
          }
          if (payload.eventType === "UPDATE") return prev.map((m) => (m.id === msg.id ? (msg as MessageWithUsers) : m));
          if (payload.eventType === "DELETE") return prev.filter((m) => m.id !== msg.id);
          return prev;
        });
      }
    }

    return () => {
      try {
        senderChannel.unsubscribe();
        receiverChannel.unsubscribe();
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
        setMessages((prev) => {
          // Avoid duplicates
          if (prev.some((m) => m.id === created.id)) return prev;
          return [...prev, created];
        });
        setNewMessage("");
        // Refetch to ensure sync with sender/receiver data
        setTimeout(() => fetchMessages(), 500);
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
    return <div className="text-center text-slate-600">Loading messages...</div>;
  }

  // When no receiverId prop provided, render conversation list + thread
  return (
    <div className="flex flex-col md:flex-row h-[600px] bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      {/* Conversations list (left) */}
      <div className="w-full md:w-1/3 border-r border-slate-200 bg-slate-50 overflow-y-auto">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h3 className="text-sm font-semibold text-slate-900">Conversations</h3>
        </div>
        <div className="p-2">
          {conversations.length === 0 ? (
            <div className="text-slate-500 text-sm p-4 text-center">No conversations yet.</div>
          ) : (
            conversations.map((c) => (
              <button 
                key={c.id} 
                onClick={() => { setActiveReceiver(c.id); }} 
                className={`w-full text-left py-3 px-3 rounded-lg mb-1 flex justify-between items-center transition-colors ${
                  activeReceiver === c.id 
                    ? 'bg-blue-100 border-l-4 border-blue-500' 
                    : 'hover:bg-slate-100'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="font-medium text-slate-900">{c.name || 'Unknown'}</div>
                  <div className="text-xs text-slate-500 truncate">{c.last}</div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-slate-50">
        {/* Chat header */}
        {activeReceiver && (
          <div className="p-4 border-b border-slate-200 bg-white">
            <h3 className="font-semibold text-slate-900">
              {conversations.find(c => c.id === activeReceiver)?.name || 'Chat'}
            </h3>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-slate-500 py-12">No messages in this conversation.</div>
          ) : (
            messages.map((message) => {
              // derive sender id robustly (sender_id is source-of-truth, fall back to joined sender)
              const senderId = message.sender_id ?? (message.sender && (message.sender as any).id) ?? null;
              const isSender = !!profileId && senderId === profileId;

              return (
                <div key={message.id} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] rounded-2xl p-4 ${
                    isSender 
                      ? "bg-blue-600 text-white rounded-br-sm" 
                      : "bg-white text-slate-900 border border-slate-200 shadow-sm rounded-bl-sm"
                  }`}>
                    {/* ownership label */}
                    <div className={`text-xs font-semibold mb-1 ${isSender ? "text-right text-blue-200" : "text-left text-slate-500"}`}>
                      {isSender ? "You" : ((message.sender && (message.sender as any).full_name) || 'Unknown')}
                    </div>

                    <p className="text-sm break-words leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${isSender ? "text-blue-200 text-right" : "text-slate-400"}`}>
                      {formatDate(message.created_at)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className="border-t border-slate-200 p-4 bg-white flex-shrink-0">
          <div className="flex gap-3">
            <input 
              type="text" 
              value={newMessage} 
              onChange={(e) => setNewMessage(e.target.value)} 
              placeholder="Type a message..." 
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
            <button 
              type="submit" 
              disabled={sending || !newMessage.trim() || !(activeReceiver || receiverId) || !profileId} 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? "..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

