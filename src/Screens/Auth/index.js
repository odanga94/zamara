import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  Image,
  Platform,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";

import Button from "../../Components/UI/Button";
import Spinner from "../../Components/UI/Spinner";
import * as authActions from "../../store/actions/auth";
import SignInWithEmailForm from "../../Components/SignInWithEmail";
import styles from "./styles";
import constants from "../../utils/constants";

const Auth = (props) => {
  const { navigation } = props;

  // console.log("props", props);

  const dispatch = useDispatch();
 
  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [credentials, setCredentials] = useState();

  const authHandler = async () => {
    if (!formIsValid) {
      Alert.alert("Wrong Input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    //console.log(credentials);
    setIsLoading(true);
    try {
      await dispatch(
        authActions.logIn(credentials.userName, credentials.password)
      );
      navigation.reset({
        index: 0,
        routes: [{ name: "Menu" }],
      });
    } catch (err) {
      console.log(err);
      Alert.alert("Something went wrong", err.message, [{ text: "Okay" }]);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <View
      style={{
        // flex: 1,
        width: "100%",
        height: "100%",
        padding: 20,
        justifyContent: "space-between",
        backgroundColor: constants.primaryColor,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={200}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.screen}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../../assets/logo.png")}
              resizeMode="contain"
            />
          </View>
          <SignInWithEmailForm
            setFormIsValid={setFormIsValid}
            setCredentials={setCredentials}
          />
        </ScrollView>
        {isLoading ? (
          <Spinner />
        ) : (
          <Button
            style={styles.fourthView}
            onPress={() => {
              authHandler();
            }}
          >
            <Text style={styles.sixthText}>Log In</Text>
          </Button>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export const authScreenOptions = {
  headerTitle: "Authentication",
  headerTitleAlign: "center",
};

export default Auth;
