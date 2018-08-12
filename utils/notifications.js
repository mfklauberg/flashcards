import { Notifications, Permissions } from 'expo';

import { getNotification, clearNotification } from './api';

export const clearLocalNotifications = () => {
  return clearNotification().then(() => {
    return Notifications.cancelAllScheduledNotificationsAsync();
  });
};

const createNotification = () => ({
  title: `Don't forget to study!`,
  body: `Don't forget your daily study session!🤓`,
  ios: {
    sound: true
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true
  }
});

export const createLocalNotification = () => {
  return getNotification().then((data) => {
    if (data) {
      return;
    }

    return Permissions.askAsync(Permissions.NOTIFICATIONS).then(
      ({ status }) => {
        if (status !== 'granted') {
          return;
        }

        Notifications.cancelAllScheduledNotificationsAsync();

        let tomorrow = new Date();

        tomorrow.setHours(13);
        tomorrow.setMinutes(0);
        tomorrow.setDate(tomorrow.getDate() + 1);

        console.log('date', tomorrow);

        return Notifications.scheduleLocalNotificationAsync(
          createNotification(),
          {
            repeat: 'day',
            time: tomorrow
          }
        );
      }
    );
  });
};
