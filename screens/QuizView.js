import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AppBar from "../components/AppBar";
import Typography from "../components/Typography";
import Card from "../components/Card";
import { _getDeck } from "../_DATA";
import IconButton from "../components/IconButton";
import { Entypo } from "@expo/vector-icons";
import { theme } from "../constants/Colors";
import QuizCompleted from "../components/QuizCompleted";

export default function QuizView({ navigation }) {
  const [deck, setDeck] = useState();
  const [score, setScore] = useState({ points: 0, counter: 0 });
  // const randomCard = sample(deck.questions)

  useEffect(() => {
    (async () => {
      const title = navigation.getParam("title");
      const _deck = await _getDeck(title);
      setDeck(_deck);
    })();
  }, [navigation]);

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
    <View style={styles.container}>
      <AppBar
        navigate={() =>
          navigation.navigate("Deck", { title: navigation.getParam("title") })
        }
      >
        Quiz
      </AppBar>
      <Typography>Quiz View</Typography>

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
              color={theme.primary}
              style={styles.button}
            >
              <Entypo name="thumbs-up" color={theme.primary} size={75} />
            </IconButton>
            <IconButton
              text="Incorrect"
              onPress={scoreIncorrect}
              color={theme.primary}
              style={styles.button}
            >
              <Entypo name="thumbs-down" color={theme.primary} size={75} />
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
  card: { margin: 20 },
  score: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  bottomButtons: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    paddingVertical: 35,
    justifyContent: "space-around"
  },
  button: {
    paddingHorizontal: 20
  }
});
