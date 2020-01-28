import { Notifications } from "expo";
import { Platform } from "react-native";
import * as Permissions from "expo-permissions";
import StorageService from "./StorageService";

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

const clearQuizReminderNotification = async () => {
  const previousNotificationId = await StorageService.getQuizReminder();
  if (!previousNotificationId) return;

  await Notifications.cancelAllScheduledNotificationsAsync();
  await StorageService.clearQuizReminder();
};

// we want cancel all scheduled notifications when
//  the user logs in for the very first time
//  the user completes a quiz
// we DO NOT want to cancel all scheduled notifications when
//  the user logs back in and has not completed a quiz in the past day
// we DO NOT want to schedule multiple notifications when
//  the user closes and opens the application multiple times
const setQuizReminderNotification = async ({ quizCompleted }) => {
  await askNotificationPermissions();

  // if a quiz was just completed then we clear the existing notification if it exists
  if (quizCompleted) await clearQuizReminderNotification();

  // if previousNotificationId is still set it means that the app
  // is initializing and the user already has a notification scheduled
  const previousNotificationId = await StorageService.getQuizReminder();
  if (previousNotificationId) return;

  const notification = createNotification();
  const tomorrow = getTomorrow();

  // we renew the notification
  const notificationId = await Notifications.scheduleLocalNotificationAsync(
    notification,
    {
      time: tomorrow,
      ...(Platform.OS !== "ios" ? { repeat: "day" } : {})
    }
  );

  // we persist the notification id for later usage
  await StorageService.setQuizReminder(notificationId);
};

export default {
  setQuizReminderNotification
};
