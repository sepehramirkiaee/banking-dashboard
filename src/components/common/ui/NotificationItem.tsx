import { NotificationType, Notification } from "@/types";
import { classNames } from "@/utils/classNames";
import { CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, JSX } from "react";

function NotificationItem({ notification, removeNotification }: { notification: Notification; removeNotification: (id: string) => void }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setVisible(true); // Trigger fade-in animation

    const timer = setTimeout(() => {
      if (!hovered) {
        setVisible(false);
        setTimeout(() => removeNotification(notification.id), 500); // Wait for fade-out animation
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [hovered]);

  const notificationStyles: Record<NotificationType, string> = {
    success: "bg-green-50 text-green-800 border-green-200",
    error: "bg-red-50 text-red-800 border-red-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  };

  const notificationIcons: Record<NotificationType, JSX.Element> = {
    success: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
    error: <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />,
    warning: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />,
  };

  return (
    <div
      className={classNames("relative border border-gray-100 flex items-center gap-3 p-4 bg-white rounded-md shadow-lg transition-all duration-75",
        visible ? "opacity-100" : "opacity-0",
        notificationStyles[notification.type]
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {notificationIcons[notification.type]}
      <span className="text-sm font-medium grow">{notification.message}</span>
      <button onClick={() => removeNotification(notification.id)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
        <XMarkIcon className="size-5" />
      </button>
    </div>
  );
}

export default NotificationItem;