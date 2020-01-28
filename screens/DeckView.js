import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../components/Typography";
import Card from "../components/Card";
import AppBar from "../components/AppBar";
import IconButton from "../components/IconButton";
import _DATA from "../_DATA";
import { theme } from "../constants/theme";
import { useDeck } from "../hooks";

export default function DeckView({ navigation }) {
  const deck = useDeck(navigation);
  const handleDelete = async () => {
    await _DATA._deleteDeck(deck.title);
    navigation.navigate("Main");
  };
  const startQuiz = () => {
    if (!deck.cards.length) return;
    navigation.navigate("Quiz", { title: deck.title });
  };

  if (!deck) return null;

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, backgroundColor: deck.color }}>
      <View>
        <AppBar navigate={() => navigation.navigate("Main")}>Deck View</AppBar>
        <View style={styles.top}>
          <View>
            <Typography>{deck.title}</Typography>
            <Typography variant="subtitle">
              Deck size: {deck.cards.length}
            </Typography>
          </View>

          <View style={styles.options}>
            <IconButton
              onPress={() =>
                navigation.navigate("CreateCard", { title: deck.title })
              }
              library="AntDesign"
              name="pluscircleo"
              text="Card"
            />
            <IconButton
              onPress={startQuiz}
              library="AntDesign"
              name="doubleright"
              text="Quiz"
            />
          </View>
        </View>

        {/* TODO: <View style={styles.switch}>
          <Typography variant="subtitle">Questions</Typography>
          <Switch onValueChange={flipCard} value={cardSide === "answer"} />
          <Typography variant="subtitle">Answers</Typography>
        </View> */}
        {deck.cards.map(card => (
          <Card key={card.question} card={card} />
        ))}
      </View>

      <IconButton
        onPress={handleDelete}
        name="delete"
        text="Delete Deck"
        size={theme.spacing(2.5)}
        style={styles.delete}
      />
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
  delete: {
    margin: theme.spacing(2),
    alignSelf: "center"
  }
  // switch: {
  //   display: "flex",
  //   flexDirection: "row",
  //   margin: "5px",
  //   justifyContent: "center"
  // }
});
