import React, { useState } from "react";
import { StyleSheet, Button, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { _addCardToDeck, _getDeck } from "../_DATA";
import AppBar from "../components/AppBar";
import Typography from "../components/Typography";

export default function CreateCardView({ navigation }) {
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

  return (
    <View style={styles.container}>
      <AppBar
        navigate={() =>
          navigation.navigate("Deck", { title: navigation.getParam("title") })
        }
      >
        New Card
      </AppBar>
      <Typography>Create Card</Typography>

      <View style={styles.card}>
        <TextInput
          onChangeText={handleChange("question")}
          value={newCard.question}
          multiline
          numberOfLines={2}
          placeholder=" Type question here"
          placeholderTextColor="blue"
          style={styles.question}
        />
      </View>
      <View style={styles.card}>
        <TextInput
          onChangeText={handleChange("answer")}
          value={newCard.answer}
          multiline
          numberOfLines={2}
          placeholder=" Type answer here"
          placeholderTextColor="red"
          style={styles.answer}
        />
      </View>
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
    padding: 15
  },
  question: {
    color: "blue"
  },
  answer: {
    color: "red"
  }
});
