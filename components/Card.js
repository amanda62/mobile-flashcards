import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { theme } from "../constants/theme";
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
    margin: theme.spacing(1),
    justifyContent: "center",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background,

    shadowOffset: { width: 0, height: 4 },
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: theme.spacing(1)
  },
  flip: { alignSelf: "flex-end" }
});
