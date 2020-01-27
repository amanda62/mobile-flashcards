import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../constants/theme";

export default function AppBar({ children, navigate, back = true }) {
  return (
    <View style={styles.bar}>
      {back && (
        <TouchableOpacity style={styles.backArrow} onPress={navigate}>
          <AntDesign name="arrowleft" color="white" size={25} />
        </TouchableOpacity>
      )}
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: theme.palette.appbar,
    height: theme.spacing(5)
  },
  backArrow: {
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    position: "absolute",
    zIndex: 1
  },
  textWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.8
  }
});
