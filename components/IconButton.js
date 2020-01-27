import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { theme } from "../constants/theme";

export default function IconButton({
  children = null,
  onPress = null,
  text = "",
  color = "black",
  style
}) {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        {children}
        <Text style={{ color, textAlign: "center" }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.transparentBackground,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(5)
  }
});
