import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import constants from "../../utils/constants";

const Spinner = (props) => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={constants.secondaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Spinner;
