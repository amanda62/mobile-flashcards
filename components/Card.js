import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { theme } from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

export default function Card({
  children = null,
  card,
  style = {},
  showFlipIcon = false
}) {
  const [cardSide, setCardSide] = useState("question");
  const oppositeSide = cardSide === "question" ? "answer" : "question";
  const flipCard = () => card && setCardSide(oppositeSide);

  return (
    <TouchableOpacity onPress={flipCard}>
      <View style={[styles.card, style]}>
        <Text style={{ color: theme.palette[cardSide] }}>{card[cardSide]}</Text>

        {children}

        {showFlipIcon && (
          <AntDesign
            name="reload1"
            color={theme.palette[oppositeSide]}
            size={20}
            style={styles.flip}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  card: {
    margin: 5,
    // textAlign: "center",
    justifyContent: "center",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: 5,
    padding: 15
  },
  flip: { alignSelf: "flex-end" }
});
