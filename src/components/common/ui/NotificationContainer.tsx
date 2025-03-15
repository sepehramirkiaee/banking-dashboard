import { createPortal } from "react-dom";
import { Notification } from "@/types";
import NotificationItem from "./NotificationItem";
import { useEffect, useState } from "react";

interface NotificationContainerProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

export default function NotificationContainer({ notifications, removeNotification }: NotificationContainerProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.getElementById("notification-root"));
  }, []);

  if (!portalRoot) return null; // ✅ Prevents error if root is missing

  return createPortal(
    <div className="flex flex-col gap-4 m-4">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} removeNotification={removeNotification} />
      ))}
    </div>,
    portalRoot
  );
}
