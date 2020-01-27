import AppBar from "../components/AppBar";
import Typography from "../components/Typography";
import React, { useState } from "react";
import { StyleSheet, Button, View, TextInput } from "react-native";
import { _addCardToDeck } from "../_DATA";
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
    const title = navigation.getParam("title");
    await _addCardToDeck(title, newCard);
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
      <Typography>Create Card</Typography>

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

      <Button title="create" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  card: {
    //TODO: don't duplicate the card component styles here
    margin: 8,
    // textAlign: "center",
    justifyContent: "center",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: 5,
    padding: 15,
    backgroundColor: theme.palette.background
  }
});
