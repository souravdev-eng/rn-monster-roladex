import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import { Colors } from "../theme";
// import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const Search = ({ value, onChangeText, theme }) => {
  const progress = useDerivedValue(() => {
    return theme === "dark" ? withSpring(1) : withSpring(0);
  });

  const rnStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    );
    return { backgroundColor };
  });
  return (
    <Animated.View style={[styles.container, rnStyle]}>
      <TextInput
        placeholder="Search Product"
        style={[
          styles.input,
          { color: theme === "dark" ? Colors.dark.text : Colors.light.text },
        ]}
        placeholderTextColor={
          theme === "dark" ? Colors.dark.text : Colors.light.text
        }
        value={value}
        onChangeText={onChangeText}
      />
    </Animated.View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width / 1.2,
    marginHorizontal: 15,
    height: 45,
    borderRadius: 10,
    marginVertical: 16,
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 10,
  },
  input: {
    paddingLeft: 10,
    alignSelf: "center",
    justifyContent: "center",
    width: "90%",
    paddingVertical: 10,
  },
});

export default Search;
