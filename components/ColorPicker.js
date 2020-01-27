import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import { theme } from "../constants/theme";

export default function ColorPicker({
  value: defaultValue = theme.randomColor(),
  onChange
}) {
  const [value, setValue] = useState(defaultValue);
  const handlePress = color => {
    setValue(color);
    onChange(color);
  };

  // const [colors] = theme.palette.randomColor()
  const size = theme.spacing(5.5);
  const border = theme.spacing(0.5);
  const margin = theme.spacing(0.5);
  const innerSize = size - 2 * border - 2 * margin;

  return (
    <ScrollView horizontal style={styles.container}>
      {//TODO: scrollview sideways
      Object.values(theme.palette.colorOptions).map(color => (
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
            borderColor: value === color ? theme.palette.primary : "white"
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: theme.spacing(2),
    alignSelf: "center",
    width: "100%"
  }
});
