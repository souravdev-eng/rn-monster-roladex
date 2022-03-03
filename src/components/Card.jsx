import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import { Colors } from "../theme";

const Card = ({ id, name, theme }) => {
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

  const rnText = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );
    return { color };
  });

  return (
    <Animated.View style={[styles.container, rnStyle]}>
      <Image
        source={{
          uri: `${`https://robohash.org/${id}?set=set2&size=180x180`}`,
        }}
        resizeMode="cover"
        style={styles.image}
      />
      <Animated.Text numberOfLines={2} style={[styles.text, rnText]}>
        {name}
      </Animated.Text>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: "42%",
    aspectRatio: 10 / 10,
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: "90%",
    aspectRatio: 12 / 9,
  },
  text: { fontSize: 18, paddingVertical: 4 },
});
