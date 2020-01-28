import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const getTomorrow = () => {
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(20);
  tomorrow.setMinutes(0);

  return tomorrow;
};

const createNotification = () => {
  return {
    title: "Take a quiz!",
    body: "👋 don't forget to quiz yourself for today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
};

const askNotificationPermissions = async () => {
  // We need to ask for Notification permissions for ios devices
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") throw new Error("Notification permissions denied");
  console.log("Notification permissions granted");
};

const setQuizReminderNotification = async ({ quizCompleted }) => {
  await askNotificationPermissions();

  // we want cancel all scheduled notifications when
  //  the user logs in for the very first time
  //  the user completes a quiz

  // we DO NOT want to cancel all scheduled notifications when
  //  the user logs back in and has not completed a quiz in the past day
  if (quizCompleted) Notifications.dismissAllNotificationsAsync();

  const notification = createNotification();
  const tomorrow = getTomorrow();

  Notifications.scheduleLocalNotificationAsync(notification, {
    time: tomorrow,
    repeat: "day"
  });
};

export default {
  setQuizReminderNotification
};
