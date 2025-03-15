export type NotificationType = "success" | "error" | "warning";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}