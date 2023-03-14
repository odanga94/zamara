import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

const constants = {
  primaryColor: "#221B3E",
  secondaryColor: "#00B83A",
  styleGuide: {
    height: height,
    width: width,
    heightRatio: height / 667,
    widthRatio: width / 375,
  },
};

export const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: constants.secondaryColor,
  },
  headerTitleStyle: {
    fontFamily: "poppins-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "poppins-regular",
  },
  headerTintColor: "white",
};

export default constants;
