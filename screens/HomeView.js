import * as WebBrowser from "expo-web-browser";
import { MonoText } from "../components/StyledText";
import Typography from "../components/Typography";
import { theme } from "../constants/Colors";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Button, Text } from "react-native";
import { _getDecks } from "../_DATA";
import ZoomOpacity from "../components/ZoomOpacity";
import AppBar from "../components/AppBar";

export default function HomeScreen({ navigation }) {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    (async () => {
      const _decks = await _getDecks();
      setDecks(_decks);
    })();
  }, []);

  const goToDeck = title => navigation.navigate("Deck", { title });
  const greeting = () => {
    const time = new Date().getHours();
    if (time < 12) return "Good morning";
    if (time < 16) return "Good afternoon";
    if (time < 20) return "Good evening";
    return "Studyin' in the moonlight";
  };

  return (
    <ScrollView>
      <AppBar back={false}>{greeting()}</AppBar>
      <Typography>Let's study!</Typography>
      <Button
        title="Create New Deck"
        onPress={() => navigation.navigate("CreateDeck")}
      />
      {decks.map(deck => (
        <ZoomOpacity
          key={deck.title}
          onPress={() => goToDeck(deck.title)}
          style={{ backgroundColor: deck.color }}
        >
          <Text style={styles.text}>{deck.title}</Text>
        </ZoomOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center"
  }
});
