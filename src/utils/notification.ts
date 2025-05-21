export type NotificationType = "danger" | "warning" | "info" | "success";

const notificationTypes = {
  danger: "bg-red-100 text-red-600",
  warning: "bg-yellow-100 text-yellow-600",
  alert: "bg-blue-100 text-blue-600",
  common: "bg-[#E5F3EA] text-[#56CE40]",
};

export const getNotificationStyle = (type: string): string => {
  switch (type) {
    // Danger notifications - critical issues that need immediate attention
    case "intrusion_detected":
    case "service_down":
    case "media_server_down":
    case "stream_stopped":
      return notificationTypes["danger"];

    // Warning notifications - important but not critical issues
    case "people_count":
    case "camera_stopped":
    case "camera_deregistered":
    case "access_removed":
    case "face_removed":
    case "recording_stopped":
    case "audio_turned_off":
      return notificationTypes["warning"];

    // Info notifications - general information
    case "face_detected":
    case "camera_started":
    case "camera_updated":
    case "camera_registered":
    case "folder_created":
    case "folder_deleted":
    case "access_granted":
    case "access_updated":
    case "face_added":
    case "recording_started":
    case "audio_turned_on":
    case "category_added":
    case "category_removed":
    case "category_updated":
    case "ownership_transfered":
      return notificationTypes["info"];

    // Success notifications - positive actions
    case "ml_started":
    case "ml_stopped":
      return notificationTypes["success"];

    // Default case
    default:
      return notificationTypes["info"];
  }
};
