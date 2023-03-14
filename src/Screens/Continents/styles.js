import { StyleSheet } from "react-native";

import constants from "../../utils/constants";

const styles = StyleSheet.create({
  userInfo: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    textAlign: "center",
    fontSize: 16,
    marginVertical: 5,
  },
    userFullName: {
    // fontWeight: "bold",
    fontFamily: "poppins-bold",
    color: constants.secondaryColor
  },
  tableRow: {
    flexDirection: "row"
  },
  codeContainer: {
    borderWidth: 2,
    borderColor: constants.primaryColor,
    width: "45%"
  }
});

export default styles;
