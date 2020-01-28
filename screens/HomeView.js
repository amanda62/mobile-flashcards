import React from "react";
import AppBar from "../components/AppBar";
import Typography from "../components/Typography";
import ZoomOpacity from "../components/ZoomOpacity";
import IconButton from "../components/IconButton";
import { View, StyleSheet } from "react-native";
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
          onPress={() => navigation.navigate("CreateDeck")}
          library="AntDesign"
          name="pluscircleo"
          text="Deck"
          color={theme.palette.appbar}
          size={theme.spacing(3.5)}
          style={styles.topOption}
        />
      </View>

      {decks.map(deck => (
        <ZoomOpacity
          key={deck.title}
          onPress={() => goToDeck(deck.title)}
          style={{ backgroundColor: deck.color }}
        >
          <View style={styles.deck}>
            <Typography variant="deckTitle">{deck.title}</Typography>
            <Typography variant="subTitle">
              {deck.cards.length} cards
            </Typography>
          </View>
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
  deck: {
    flexDirection: "row",
    justifyContent: "center"
  }
});
