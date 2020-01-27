import React from "react";
import AppBar from "../components/AppBar";
import Typography from "../components/Typography";
import ZoomOpacity from "../components/ZoomOpacity";
import IconButton from "../components/IconButton";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../constants/theme";
import { useDecks } from "../hooks";

export default function HomeScreen({ navigation }) {
  const decks = useDecks();

  const goToDeck = title => navigation.navigate("Deck", { title });
  const greeting = () => {
    const time = new Date().getHours();
    if (time < 12) return "Good morning";
    if (time < 17) return "Good afternoon";
    if (time < 21) return "Good evening";
    return "Studyin' in the moonlight";
  };

  return (
    <View>
      <AppBar back={false}>{greeting()}</AppBar>

      <View style={styles.top}>
        <Typography>Let's learn!</Typography>
        <IconButton
          text="Deck"
          onPress={() => navigation.navigate("CreateDeck")}
          style={styles.topOption}
        >
          <AntDesign
            name="pluscircleo"
            color={theme.palette.appbar}
            size={theme.spacing(3.5)}
          />
        </IconButton>
      </View>

      {decks.map(deck => (
        <ZoomOpacity
          key={deck.title}
          onPress={() => goToDeck(deck.title)}
          style={{ backgroundColor: deck.color }}
        >
          <Text style={styles.text}>{deck.title}</Text>
        </ZoomOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  topOption: {},
  text: {
    textAlign: "center"
  }
});
