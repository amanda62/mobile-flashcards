import React from "react";
import { StyleSheet, Text } from "react-native";

export default function Typography({ children, variant = "title" }) {
  return <Text style={[styles.root, styles[variant]]}>{children}</Text>;
}

const styles = StyleSheet.create({
  // root: { fontFamily: [] },
  title: {
    fontSize: 24,
    marginTop: 2,
    marginHorizontal: 12
  },
  subtitle: {
    fontSize: 16,
    marginHorizontal: 12
  }
});
