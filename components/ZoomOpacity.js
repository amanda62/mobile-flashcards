import React, { useState } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../constants/theme";

export default function DeckWrapper({ children, onPress, style }) {
  const [animating, setAnimating] = useState(false);
  const [scale] = useState(new Animated.Value(1));

  const _startAnimation = () => {
    const delay = 350;
    setAnimating(true);
    Animated.timing(scale, {
      toValue: 1.6,
      duration: delay
    }).start();
    return new Promise(resolve => setTimeout(resolve, delay + 200));
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
    margin: "5px",
    // textAlign: "center",
    justifyContent: "center",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0.2, 0.5)",
    borderRadius: "5px",
    height: "50px",
    backgroundColor: theme.palette.colorOptions.blanchedAlmond
    // `${theme.randomColor()}`
  }
});
