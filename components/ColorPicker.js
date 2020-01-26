import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { theme } from "../constants/Colors";

export default function ColorPicker({
  value: defaultValue = theme.randomColor(),
  onChange
}) {
  const [value, setValue] = useState(defaultValue);
  const handlePress = color => {
    setValue(color);
    onChange(color);
  };

  const size = 44;
  const border = 3;
  const margin = 3;
  const innerSize = size - 2 * border - 2 * margin;

  return (
    <View style={styles.container}>
      {//TODO: scroll sideways
      Object.values(theme.palette).map(color => (
        <TouchableOpacity
          onPress={() => handlePress(color)}
          key={color}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: size,
            height: size,
            marginHorizontal: 3,
            borderRadius: 30,
            borderWidth: border,
            borderColor: value === color ? theme.primary : "white"
          }}
        >
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: color,
              width: innerSize,
              height: innerSize,
              borderRadius: 30,
              margin: margin
            }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 15,
    alignSelf: "center"
  }
});
