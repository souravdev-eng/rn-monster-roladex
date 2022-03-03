import React from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import { StyleSheet, View, StatusBar, Switch, Text } from "react-native";
import { Colors } from "../theme";
// import { Colors } from "react-native/Libraries/NewAppScreen";

const Header = ({ onValueChange, value, trackColor, theme }) => {
  const progress = useDerivedValue(() => {
    return theme === "dark" ? withSpring(1) : withSpring(0);
  });

  const rnText = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      ["purple", Colors.dark.text]
    );
    return { color };
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, rnText]}>
        Monster Roladex
      </Animated.Text>
      <View style={styles.switchButton}>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={trackColor}
          thumbColor={"violet"}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight * 1.2,
    paddingVertical: 15,
    height: 78,
  },
  switchButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    position: "absolute",
    top: 0,
    right: 10,
  },
  title: {
    fontSize: 22,
    textTransform: "uppercase",
    fontWeight: "700",
    alignSelf: "center",
    marginRight: 20,
    color: "purple",
  },
});
