import AppBar from "../components/AppBar";
import React, { useState } from "react";
import { StyleSheet, Button, View, TextInput } from "react-native";
import _DATA from "../_DATA";
import { theme } from "../constants/theme";
import { useDeck } from "../hooks";

export default function CreateCardView({ navigation }) {
  const deck = useDeck(navigation);
  const [newCard, setNewCard] = useState({
    question: "",
    answer: ""
  });

  const handleChange = name => text => setNewCard({ ...newCard, [name]: text });
  const handleSubmit = async event => {
    event.preventDefault();
    if (!newCard.question.trim() || !newCard.answer.trim()) return;
    const title = navigation.getParam("title");
    await _DATA._addCardToDeck(title, newCard);
    navigation.navigate("Deck", { title });
  };

  if (!deck) return null;

  return (
    <View style={[styles.container, { backgroundColor: deck.color }]}>
      <AppBar
        navigate={() =>
          navigation.navigate("Deck", { title: navigation.getParam("title") })
        }
      >
        New Card
      </AppBar>

      <View style={styles.inputs}>
        {["question", "answer"].map(cardSide => (
          <View style={styles.card} key={cardSide}>
            <TextInput
              onChangeText={handleChange(cardSide)}
              value={newCard[cardSide]}
              multiline
              numberOfLines={2}
              placeholder={`Type ${cardSide} here`}
              placeholderTextColor={theme.palette[cardSide]}
              style={{ color: theme.palette[cardSide] }}
            />
          </View>
        ))}
      </View>

      <Button
        title="create"
        onPress={handleSubmit}
        color={theme.palette.appbar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputs: {
    marginVertical: theme.spacing(2)
  },
  card: {
    //TODO: don't duplicate the card component styles here
    margin: 8,
    justifyContent: "center",
    borderRadius: 5,
    padding: 15,
    backgroundColor: theme.palette.background,

    shadowOffset: { width: 0, height: 4 },
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: theme.spacing(1)
  }
});
