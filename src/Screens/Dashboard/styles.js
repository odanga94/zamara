import { StyleSheet } from "react-native";
import constants from "../../utils/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: constants.styleGuide.height / 25,
  },
  titleContainer: { flex: 1 },
  bodyContainer: { flex: 3 },
  titleText: {
    fontSize: 20,
    fontFamily: "poppins-regular",
  },
  userFullName: {
    // fontWeight: "bold",
    fontFamily: "poppins-bold",
  },
  bodyText: {
    fontFamily: "poppins-regular",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 7.5
  },
  userInfo: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    textAlign: "center",
    fontSize: 16,
    marginVertical: 5,
  },
});

export default styles;
