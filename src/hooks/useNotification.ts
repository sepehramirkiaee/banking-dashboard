import { NotificationType, Notification } from "@/types";
import { useState, useCallback } from "react";

export default function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: NotificationType) => {
    setNotifications((prev) => {
      if (prev.length >= 5) return prev; // Limit to 5 notifications
      return [...prev, { id: crypto.randomUUID(), message, type }];
    });
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  return { notifications, addNotification, removeNotification };
}