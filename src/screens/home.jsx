import {
  View,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

import Header from "../components/Header";
import Search from "../components/Search";
import Card from "../components/Card";
import { Colors, colors } from "../theme";

const Home = () => {
  const [monsters, setMonster] = useState([]);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("light");

  const { width } = Dimensions.get("window");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => {
        setMonster(users);
      });
  }, []);

  const filterData = monsters.filter((monster) =>
    monster.name.toLowerCase().includes(search.toLowerCase())
  );

  const progress = useDerivedValue(() => {
    return theme === "dark" ? withSpring(1) : withSpring(0);
  }, [theme]);

  const rnStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );
    return { backgroundColor };
  });

  return (
    <Animated.View style={[{ backgroundColor: "#fff", flex: 1 }, rnStyle]}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{ flex: 1 }}
      >
        <>
          <Header
            theme={theme}
            value={theme === "dark"}
            onValueChange={(toggled) => {
              setTheme(toggled ? "dark" : "light");
            }}
            trackColor={Colors.SWITCH_TRACK_COLOR}
          />
          <View
            style={{
              width: width,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <FlatList
              data={filterData}
              ListHeaderComponent={
                <Search
                  value={search}
                  onChangeText={(t) => setSearch(t)}
                  theme={theme}
                />
              }
              numColumns={2}
              renderItem={({ item, index }) => (
                <Card key={index} {...item} theme={theme} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default Home;
