import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../components/Typography";
import Card from "../components/Card";
import AppBar from "../components/AppBar";
import IconButton from "../components/IconButton";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../constants/theme";
import { useDeck } from "../hooks";

export default function DeckView({ navigation }) {
  const deck = useDeck(navigation);

  if (!deck) return null;

  return (
    <View style={{ flex: 1, backgroundColor: deck.color }}>
      <AppBar navigate={() => navigation.navigate("Main")}>Deck View</AppBar>
      <View style={styles.top}>
        <View>
          <Typography>{deck.title}</Typography>
          <Typography variant="subtitle">
            Deck size: {deck.questions.length}
          </Typography>
        </View>

        <View style={styles.options}>
          <IconButton
            onPress={() =>
              navigation.navigate("CreateCard", { title: deck.title })
            }
            text="Card"
          >
            <AntDesign
              name="pluscircleo"
              color={theme.palette.secondary}
              size={theme.spacing(3.5)}
            />
          </IconButton>

          <IconButton
            onPress={() => navigation.navigate("Quiz", { title: deck.title })}
            text="Quiz"
          >
            <AntDesign
              name="doubleright"
              color={theme.palette.secondary}
              size={theme.spacing(3.5)}
            />
          </IconButton>
        </View>
      </View>

      {/* TODO: <View style={styles.switch}>
        <Typography variant="subtitle">Questions</Typography>
        <Switch onValueChange={flipCard} value={cardSide === "answer"} />
        <Typography variant="subtitle">Answers</Typography>
      </View> */}
      {deck.questions.map(card => (
        <Card key={card.question} card={card} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.transparentBackground,
    paddingHorizontal: theme.spacing(1)
  },
  options: {
    flexDirection: "row"
  },
  switch: {
    display: "flex",
    flexDirection: "row",
    margin: "5px",
    justifyContent: "center"
  }
});
