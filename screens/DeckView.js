import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Switch,
  Button
} from "react-native";
import { _getDeck } from "../_DATA";
import Typography from "../components/Typography";
import Card from "../components/Card";
import AppBar from "../components/AppBar";
import IconButton from "../components/IconButton";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../constants/Colors";

export default function DeckView({ navigation }) {
  const [deck, setDeck] = useState();

  useEffect(() => {
    (async () => {
      const title = navigation.getParam("title");
      const _deck = await _getDeck(title);
      setDeck(_deck);
    })();
  }, [navigation]);
  if (!deck) return null;

  return (
    <View style={styles.container}>
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
            text="Add"
          >
            <AntDesign name="pluscircleo" color={theme.secondary} size={30} />
          </IconButton>

          <IconButton
            onPress={() => navigation.navigate("Quiz", { title: deck.title })}
            text="Quiz"
          >
            <AntDesign name="doubleright" color={theme.secondary} size={30} />
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
  container: {
    flex: 1,
    // flexDirection: "column",
    backgroundColor: "#fff"
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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
