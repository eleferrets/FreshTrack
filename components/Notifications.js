import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

let nextId = 1;

const getNotificationId = () => {
  const id = nextId;
  nextId += 1;
  return id.toString();
};

export const scheduleNotification = async (title, body, date) => {
    const trigger = new Date(date + 6000); // Schedule the notification 1 minute in the future

  const id = getNotificationId();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { id },
    },
    trigger: trigger,

  });

  return id;
};

export async function scheduleNotificationInstant(title, body) {
    const trigger = new Date(Date.now() + 60000); // Schedule the notification 1 minute in the future
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: trigger,
    });
    return notificationId;
  }

export const updateNotification = async (id, title, body, date) => {
  const trigger = new Date(date);
  trigger.setHours(12);
  trigger.setMinutes(0);
  trigger.setSeconds(0);

  const notificationId = id.toString();

  await Notifications.cancelScheduledNotificationAsync(notificationId);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { id },
    },
    trigger: {
      year: trigger.getFullYear(),
      month: trigger.getMonth(),
      day: trigger.getDate(),
      hour: trigger.getHours(),
      minute: trigger.getMinutes(),
    },
  });

  return notificationId;
};

export const cancelNotification = async (id) => {
  const notificationId = id.toString();
  await Notifications.cancelScheduledNotificationAsync(notificationId);
};
