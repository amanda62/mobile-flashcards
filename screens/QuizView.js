import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import AppBar from "../components/AppBar";
import Typography from "../components/Typography";
import Card from "../components/Card";
import IconButton from "../components/IconButton";
import { Entypo } from "@expo/vector-icons";
import { theme } from "../constants/theme";
import QuizCompleted from "../components/QuizCompleted";
import { useDeck } from "../hooks";

export default function QuizView({ navigation }) {
  const deck = useDeck(navigation);
  const [score, setScore] = useState({ points: 0, counter: 0 });
  // const randomCard = sample(deck.questions)

  if (!deck) {
    return null;
  }

  const scoreCorrect = () =>
    setScore({ points: score.points + 1, counter: score.counter + 1 });
  const scoreIncorrect = () =>
    setScore({ ...score, counter: score.counter + 1 });
  const restart = () => setScore({ points: 0, counter: 0 });

  const nextCard = deck.questions[score.counter]
    ? deck.questions[score.counter]
    : null;

  return (
    <View style={[styles.container, { backgroundColor: deck.color }]}>
      <AppBar
        navigate={() =>
          navigation.navigate("Deck", { title: navigation.getParam("title") })
        }
      >
        Quiz
      </AppBar>
      <Typography>{deck.title}</Typography>

      {!deck.questions.length && (
        <View>
          <Typography>No cards</Typography>
        </View>
      )}

      {!!deck.questions.length && nextCard ? (
        <View style={styles.container}>
          <>
            <View style={styles.score}>
              <Typography variant="subtitle">
                {score.points} / {score.counter}
              </Typography>
              <Typography variant="subtitle">
                {deck.questions.length - score.counter} left
              </Typography>
            </View>

            <Card
              key={nextCard.question}
              card={nextCard}
              style={styles.card}
              showFlipIcon
            />
          </>

          <View style={styles.bottomButtons}>
            <IconButton
              text="Correct"
              onPress={scoreCorrect}
              color={theme.palette.primary}
              style={styles.button}
            >
              <Entypo
                name="thumbs-up"
                color={theme.palette.primary}
                size={theme.spacing(9)}
              />
            </IconButton>
            <IconButton
              text="Incorrect"
              onPress={scoreIncorrect}
              color={theme.palette.primary}
              style={styles.button}
            >
              <Entypo
                name="thumbs-down"
                color={theme.palette.primary}
                size={theme.spacing(9)}
              />
            </IconButton>
          </View>
        </View>
      ) : (
        <QuizCompleted
          score={score}
          styles={{
            bottomButtons: styles.bottomButtons,
            button: styles.button
          }}
          restart={restart}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { margin: theme.spacing(2.5) },
  score: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  bottomButtons: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    paddingVertical: theme.spacing(4.5),
    justifyContent: "space-around"
  },
  button: {
    paddingHorizontal: theme.spacing(2.5)
  }
});
