import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import constants from "../../utils/constants";

const ErrorMessage = (props) => {
  return (
    <View style={styles.centered}>
      <Text style={styles.message}>An error occurred 😞</Text>
      <Text style={styles.message}>{props.message}</Text>
      <View style={{ marginVertical: 15 }}>
        <Button
          title="Try Again"
          color={constants.secondaryColor}
          onPress={() => {
            props.pressed();
          }}
        />
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
});

export default ErrorMessage;
