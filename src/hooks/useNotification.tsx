import { create } from "zustand";
import { NotificationType, Notification } from "@/types";

interface NotificationState {
  notifications: Notification[];
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: (id: string) => void;
}

export const useNotification = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (message, type) =>
    set((state) => {
      if (state.notifications.length >= 5) return state; // Limit to 5 notifications
      return { notifications: [...state.notifications, { id: crypto.randomUUID(), message, type }] };
    }),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
    })),
}));