import React, { useEffect } from "react";
import { View } from "react-native";
import Typography from "./Typography";
import IconButton from "./IconButton";
import { theme } from "../constants/theme";
import NotificationService from "../NotificationService";

export default function QuizCompleted({ score, styles, restart }) {
  useEffect(() => {
    NotificationService.setQuizReminderNotification({ quizCompleted: true });
  }, []);

  return (
    <View style={styles.container}>
      <>
        <Typography>All done!</Typography>
        <Typography variant="subtitle">
          Your final score is {score.points} / {score.counter} correct
        </Typography>
        <Typography variant="subtitle">Want to go again?</Typography>
      </>
      <View style={styles.bottomButtons}>
        <IconButton
          onPress={restart}
          library="Entypo"
          name="new"
          text="Restart"
          color={theme.palette.appbar}
          style={styles.button}
          size={theme.spacing(9)}
        />
      </View>
    </View>
  );
}
