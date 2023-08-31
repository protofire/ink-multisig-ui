import { useCallback, useEffect, useMemo } from "react";

import {
  AppNotification,
  useAppNotificationContext,
} from "@/components/AppToastNotification/AppNotificationsContext";

import { AppToastNotificationUI, toast } from "./AppToastNotificationUI";

function _createToast(
  notification: AppNotification,
  remove: () => void
): number | string {
  return toast(notification.message, {
    type: notification.type ?? "default",
    onOpen: remove,
  });
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
      _createToast(firstNotification, removeNotificationCb);
    }
  }, [firstNotification, removeNotificationCb]);
  return <AppToastNotificationUI />;
}
