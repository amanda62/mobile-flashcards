import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { theme } from "../constants/theme";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function IconButton({
  onPress = null,
  library = "AntDesign",
  name = "add",
  text = name,
  size = theme.spacing(3.5),
  color = theme.palette.secondary,
  style
}) {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress} style={styles.opacity}>
        {library === "AntDesign" && (
          <AntDesign name={name} color={color} size={size} />
        )}
        {library === "Entypo" && (
          <Entypo name={name} color={color} size={size} />
        )}
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
    borderRadius: theme.spacing(5),
    alignSelf: "center"
  },
  opacity: {
    alignItems: "center"
  }
});
