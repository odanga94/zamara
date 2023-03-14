import React from "react";
import { View, Text, StyleSheet } from "react-native";

import constants from "../../utils/constants";
import Button from "./Button";

const ErrorMessage = (props) => {
  return (
    <View style={styles.centered}>
      <Text style={styles.message}>An error occurred 😞</Text>
      <Text style={styles.message}>{props.message}</Text>
      <View style={{ marginVertical: 15 }}>
        <Button
          style={{
            ...styles.button,
            width: constants.styleGuide.width / 1.2,
            borderRadius: 10,
          }}
          onPress={() => {
            props.pressed();
          }}
        >
          <Text style={styles.sixthText}>TRY AGAIN</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontFamily: "poppins-bold",
    fontSize: 18,
    marginHorizontal: 15,
    textAlign: "center",
  },
  button: {
    height: 50,
    width: constants.styleGuide.width / 3,
    backgroundColor: constants.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 25,
    // alignSelf: "center",
  },
  sixthText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-bold",
  },
});

export default ErrorMessage;
