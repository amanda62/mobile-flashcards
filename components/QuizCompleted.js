import React, { useEffect } from "react";
import { View } from "react-native";
import Typography from "./Typography";
import IconButton from "./IconButton";
import { theme } from "../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { _setLastQuizTime } from "../_DATA";

export default function QuizCompleted({ score, styles, restart }) {
  useEffect(() => {
    _setLastQuizTime();
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
          text="Restart"
          onPress={restart}
          color={theme.primary}
          style={styles.button}
        >
          <Entypo name="new" color={theme.primary} size={75} />
        </IconButton>
      </View>
    </View>
  );
}
