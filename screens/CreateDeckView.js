import React, { useState } from "react";
import { StyleSheet, Button, TextInput, View } from "react-native";
import _DATA from "../_DATA";
import AppBar from "../components/AppBar";
import Typography from "../components/Typography";
import ColorPicker from "../components/ColorPicker";
import { theme } from "../constants/theme";
import { useDecks } from "../hooks";

export default function CreateDeckView({ navigation }) {
  const decks = useDecks();
  const [newDeck, setNewDeck] = useState({
    title: "",
    color: theme.randomColor()
  });

  const updateTitle = title => setNewDeck({ ...newDeck, title });
  const updateColor = color => setNewDeck({ ...newDeck, color });
  const handleSubmit = async () => {
    if (
      !newDeck.title.trim() ||
      decks.some(deck => deck.title === newDeck.title)
    )
      return;
    await _DATA._createDeck(newDeck);
    navigation.navigate("Deck", { title: newDeck.title });
  };

  return (
    <View>
      <AppBar navigate={() => navigation.navigate("Main")}>New Deck</AppBar>
      <Typography>Start a new deck</Typography>
      <TextInput
        style={styles.input}
        onChangeText={updateTitle}
        value={newDeck.title}
        placeholder="What is the topic?"
      />
      <ColorPicker value={newDeck.color} onChange={updateColor} />
      <Button title="create" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 30
  }
});
