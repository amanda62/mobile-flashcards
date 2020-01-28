import React, { useState } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../constants/theme";

export default function DeckWrapper({ children, onPress, style }) {
  const [animating, setAnimating] = useState(false);
  const [scale] = useState(new Animated.Value(1));

  const _startAnimation = () => {
    const delay = 300;
    setAnimating(true);
    Animated.timing(scale, {
      toValue: 1.25,
      duration: delay
    }).start();
    return new Promise(resolve => setTimeout(resolve, delay + 175));
  };

  const handlePress = async () => {
    await _startAnimation();
    onPress();
  };

  return (
    <Animated.View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ transform: [{ scale: scale }], zIndex: animating ? 1 : 0 }}
    >
      <TouchableOpacity style={[styles.deck, style]} onPress={handlePress}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  deck: {
    margin: theme.spacing(1),
    justifyContent: "center",
    borderRadius: theme.spacing(1),
    height: theme.spacing(9),
    backgroundColor: theme.palette.colorOptions.blanchedAlmond,

    shadowOffset: { width: 0, height: 4 },
    shadowColor: "rgba(0, 0, .2, 0.5)",
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: theme.spacing(1)
  }
});
