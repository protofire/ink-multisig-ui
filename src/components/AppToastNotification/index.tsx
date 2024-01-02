import { useCallback, useEffect, useMemo } from "react";
import { ToastOptions } from "react-toastify";

import {
  AppNotification,
  isAppNotification,
  useAppNotificationContext,
} from "@/components/AppToastNotification/AppNotificationsContext";

import { AppToastNotificationUI, toast } from "./AppToastNotificationUI";

export function createToast(
  notification: AppNotification | React.ReactNode,
  options?: ToastOptions
): number | string {
  if (isAppNotification(notification)) {
    return toast(notification.message, {
      type: notification.type ?? "default",
      ...options,
    });
  }

  return toast(notification, options);
}

export function AppToastNotifications() {
  const { appNotifications, removeNotification } = useAppNotificationContext();
  const firstNotification = useMemo(
    () => (appNotifications.length > 0 ? appNotifications[0] : null),
    [appNotifications]
  );

  const removeNotificationCb = useCallback(() => {
    if (firstNotification) {
      removeNotification(firstNotification.id);
    }
  }, [removeNotification, firstNotification]);

  useEffect(() => {
    if (firstNotification) {
      createToast(firstNotification, { onOpen: removeNotificationCb });
    }
  }, [firstNotification, removeNotificationCb]);
  return <AppToastNotificationUI />;
}
