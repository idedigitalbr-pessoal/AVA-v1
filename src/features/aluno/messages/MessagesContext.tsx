"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MessageThread, ThreadMessage } from "./types";
import { useStudentMessages } from "@/hooks/use-queries";

interface MessagesContextType {
  threads: MessageThread[];
  sendMessage: (threadId: string, text: string) => void;
  markThreadAsRead: (threadId: string) => void;
  getThread: (threadId: string) => MessageThread | undefined;
  isLoading: boolean;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export function MessagesProvider({ children }: { children: ReactNode }) {
  const { data: messagesData, isLoading } = useStudentMessages();
  const [threads, setThreads] = useState<MessageThread[]>([]);

  useEffect(() => {
    if (messagesData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThreads(messagesData as any);
    }
  }, [messagesData]);

  const sendMessage = (threadId: string, text: string) => {
    setThreads(current => current.map(thread => {
      if (thread.id === threadId) {
        const now = new Date();
        const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        const newMessage: ThreadMessage = {
          id: `msg-${Date.now()}`,
          senderId: "st-12345", // Mock student ID
          text,
          timestamp,
        };

        return {
          ...thread,
          messages: [...thread.messages, newMessage],
          updatedAt: timestamp,
        };
      }
      return thread;
    }));
  };

  const markThreadAsRead = (threadId: string) => {
    setThreads(current => current.map(thread => {
      if (thread.id === threadId && thread.unreadCount > 0) {
        return { ...thread, unreadCount: 0 };
      }
      return thread;
    }));
  };

  const getThread = (threadId: string) => {
    return threads.find(t => t.id === threadId);
  };

  return (
    <MessagesContext.Provider value={{ threads, sendMessage, markThreadAsRead, getThread, isLoading }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
}
