import React from "react";
import { StyleSheet, Text } from "react-native";
import { theme } from "../constants/theme";

export default function Typography({ children, variant = "title" }) {
  return <Text style={[styles.root, styles[variant]]}>{children}</Text>;
}

const styles = StyleSheet.create({
  root: {
    marginHorizontal: theme.spacing(1.5)
  },
  title: {
    fontSize: theme.spacing(3),
    fontWeight: "bold",
    marginTop: theme.spacing(0.5)
  },
  subtitle: {
    fontSize: theme.spacing(2)
  },
  deckTitle: {
    fontSize: theme.spacing(2),
    textAlign: "center",
    fontWeight: 500
  }
});
