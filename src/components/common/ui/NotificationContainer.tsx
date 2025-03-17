import NotificationItem from "./NotificationItem";
import { useNotification } from "@/hooks/useNotification";

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div>
      {notifications.length > 0 && (
        <div className="flex flex-col gap-4 m-4">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} removeNotification={removeNotification} />
          ))}
        </div>
      )}
    </div>
  )
}
