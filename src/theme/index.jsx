import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const Colors = {
  dark: {
    background: "#1E1E1E",
    circle: "#5c5b5bd5",
    text: "#F8F8F8",
  },
  light: {
    background: "#F8F8F8",
    circle: "#FFF",
    text: "#1E1E1E",
  },
  SWITCH_TRACK_COLOR: {
    true: "rgba(256,0,256,0.2)",
    false: "rgba(0,0,0,0.1)",
  },
};
