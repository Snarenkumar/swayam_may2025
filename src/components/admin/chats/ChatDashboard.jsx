"use client";

import { useState, useEffect } from "react";
import {
  getChatSessions,
  getChatSession,
  loadFirebaseScripts,
} from "@/lib/firebase";

export default function ChatDashboard() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [error, setError] = useState(null);
  const [statsData, setStatsData] = useState({
    totalSessions: 0,
    currentSessions: 0,
    avgResponseTime: "2m",
    responseRate: "4 / 4",
  });
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Initialize Firebase when component mounts
  useEffect(() => {
    const initFirebase = async () => {
      try {
        setError(null);
        await loadFirebaseScripts();
      } catch (err) {
        console.error("Failed to load Firebase:", err);
        setError("Failed to load Firebase. Chat logs are unavailable.");
      }
    };

    initFirebase();
  }, []);

  useEffect(() => {
    const loadChatSessions = async () => {
      try {
        setLoading(true);
        const chatSessions = await getChatSessions();

        if (!chatSessions) {
          setError("Failed to load chat sessions");
          setSessions([]);
          return;
        }

        // Sort by most recent first
        chatSessions.sort((a, b) => {
          const dateA = new Date(a.metadata?.lastUpdated || 0);
          const dateB = new Date(b.metadata?.lastUpdated || 0);
          return dateB - dateA;
        });

        setSessions(chatSessions);

        // Update stats
        setStatsData({
          totalSessions: chatSessions.length,
          currentSessions: chatSessions.filter(
            (s) => s.metadata?.status === "active"
          ).length,
          avgResponseTime: "2m",
          responseRate: "4 / 4",
        });
      } catch (err) {
        console.error("Error loading chat sessions:", err);
        setError(
          "Failed to load chat sessions. Please refresh the page to try again."
        );
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    if (!error) {
      loadChatSessions();

      // Set up a real-time listener for updates
      const intervalId = setInterval(loadChatSessions, 30000); // Refresh every 30 seconds

      return () => clearInterval(intervalId);
    }
  }, [error]);

  const handleSessionClick = async (sessionId) => {
    try {
      setSelectedSession(sessionId);
      setSelectedMessages([]);

      const session = await getChatSession(sessionId);

      if (!session) {
        console.error("Failed to load session data");
        return;
      }

      if (session && session.messages) {
        // Sort messages by timestamp
        const sortedMessages = [...session.messages].sort((a, b) => {
          const dateA = new Date(a.timestamp);
          const dateB = new Date(b.timestamp);
          return dateA - dateB;
        });

        setSelectedMessages(sortedMessages);
      } else {
        setSelectedMessages([]);
      }
    } catch (err) {
      console.error("Error loading session messages:", err);
      setSelectedMessages([]);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Unknown";

    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const formatSessionId = (sessionId) => {
    if (!sessionId) return "Unknown";

    // Return just the last 7 characters of the session ID
    const shortId = sessionId.substring(sessionId.length - 7);
    return `Anonymous (${shortId})`;
  };

  const formatMessagePreview = (messages) => {
    if (!messages || messages.length === 0) return "No messages";

    // Find the last user message
    const lastUserMessage = [...messages]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .find((msg) => msg.sender === "user");

    if (lastUserMessage) {
      const maxLength = 30;
      return lastUserMessage.text.length > maxLength
        ? lastUserMessage.text.substring(0, maxLength) + "..."
        : lastUserMessage.text;
    }

    return "No user messages";
  };

  // Format HTML content for display
  const formatHtmlContent = (html) => {
    // Create a div to parse the HTML content
    if (typeof document !== "undefined") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      return tempDiv.textContent || tempDiv.innerText || html;
    }

    // Simple regex-based fallback for server-side
    return html.replace(/<[^>]*>/g, "");
  };

  const applyFilters = () => {
    if (!searchTerm) return sessions;

    const search = searchTerm.toLowerCase();

    // Filter by message content
    return sessions.filter((session) => {
      // Check if any message in the conversation contains the search term
      if (!session.messages || session.messages.length === 0) return false;

      return session.messages.some((message) => {
        // Strip HTML tags for text searching
        const plainText = formatHtmlContent(message.text).toLowerCase();
        return plainText.includes(search);
      });
    });
  };

  const filteredSessions = applyFilters();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Chat Dashboard</h1>
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Chat Dashboard</h1>
        <p className="text-sm text-gray-500 mb-6">
          View and manage user chat conversations
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">TOTAL SESSIONS</p>
            <p className="text-2xl font-bold">{statsData.totalSessions}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">CURRENT SESSIONS</p>
            <p className="text-2xl font-bold">{statsData.currentSessions}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">AVG. RESPONSE TIME</p>
            <p className="text-2xl font-bold">{statsData.avgResponseTime}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">RESPONSE RATE</p>
            <p className="text-2xl font-bold">{statsData.responseRate}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Filters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Search in messages"
              className="border p-2 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="date"
              placeholder="From"
              className="border p-2 rounded"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <input
              type="date"
              placeholder="To"
              className="border p-2 rounded"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          <div className="mt-3 text-right">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="col-span-1">
            <h2 className="text-lg font-semibold mb-3">Conversations</h2>
            <div className="bg-white rounded shadow overflow-hidden">
              {loading ? (
                <div className="p-4 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mb-2"></div>
                  <p>Loading conversations...</p>
                </div>
              ) : filteredSessions.length === 0 ? (
                <div className="p-4 text-center">No conversations found</div>
              ) : (
                <div className="divide-y max-h-[600px] overflow-y-auto">
                  {filteredSessions.map((session) => (
                    <div
                      key={session.id}
                      className={`p-3 hover:bg-gray-50 cursor-pointer ${
                        selectedSession === session.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => handleSessionClick(session.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            {formatSessionId(session.id)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatTimestamp(session.metadata?.lastUpdated)}
                          </p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {session.metadata?.messageCount || 0} messages
                        </span>
                      </div>
                      <p className="text-sm mt-1 text-gray-700 truncate">
                        {formatMessagePreview(session.messages)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-lg font-semibold mb-3">
              Chat Messages{" "}
              {selectedSession ? `(${formatSessionId(selectedSession)})` : ""}
            </h2>
            <div className="bg-white rounded shadow h-[600px] overflow-hidden flex flex-col">
              {!selectedSession ? (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a conversation to view messages
                </div>
              ) : selectedMessages.length > 0 ? (
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {selectedMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-blue-100 ml-auto"
                            : "bg-gray-100"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium">
                            {message.sender === "user" ? "User" : "Bot"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                        <div
                          dangerouslySetInnerHTML={{ __html: message.text }}
                          className="break-words"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mb-2"></div>
                    <p>Loading messages...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
