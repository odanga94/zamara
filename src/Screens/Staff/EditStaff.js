import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../../Components/UI/HeaderButton";
import Spinner from "../../Components/UI/Spinner";
// import ErrorMessage from "../../components/UI/ErrorMessage";
import { createStaff, updateStaff } from "../../store/actions/staff";
import Input from "../../Components/Input";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (let key in updatedValidities) {
      if (!updatedValidities[key]) {
        updatedFormIsValid = false;
        break;
      }
    }

    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const EditStaffScreen = (props) => {
  const dispatch = useDispatch();

  const staffId = props.route.params ? props.route.params.staffId : null;
  const editedStaff = useSelector((state) =>
    state.staff.staff.find((staffMember) => staffMember.staffNumber === staffId)
  );

  // console.log("ed", editedStaff.salary);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      staffNumber: editedStaff ? editedStaff.staffNumber : "",
      staffName: editedStaff ? editedStaff.staffName : "",
      staffEmail: editedStaff ? editedStaff.staffEmail : "",
      department: editedStaff ? editedStaff.department : "",
      salary: editedStaff ? editedStaff.salary.toString() : "0",
    },
    inputValidities: {
      staffNumber: editedStaff ? true : false,
      staffName: editedStaff ? true : false,
      staffEmail: editedStaff ? true : false,
      department: editedStaff ? true : false,
      salary: editedStaff ? true : false,
    },
    formIsValid: editedStaff ? true : false,
  });

  // console.log("frm", formState);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = useCallback(async () => {
    // console.log("Submitting...");
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      // console.log('form', formState);
      if (editedStaff) {
        await dispatch(
          updateStaff(
            formState.inputValues.staffNumber,
            formState.inputValues.staffName,
            formState.inputValues.staffEmail,
            formState.inputValues.department,
            +formState.inputValues.salary,
            staffId
          )
        );
      } else {
        await dispatch(
          createStaff(
            formState.inputValues.staffNumber,
            formState.inputValues.staffName,
            formState.inputValues.staffEmail,
            formState.inputValues.department,
            formState.inputValues.salary
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      Alert.alert("Error!", `${err.message} Please try again later`, [
        { text: "Okay" },
      ]);
      setErrorMessage(err.message);
    }
    setIsLoading(false);
  }, [dispatch, /* prodId, */ formState]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-save-outline" : "ios-save-outline"
            }
            onPress={() => {
              submitHandler();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [submitHandler]);

  const inputChangedHandler = useCallback(
    (inputIdentifier, text, validity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: text,
        isValid: validity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return <Spinner />;
  }

  /* if (!isLoading && errorMessage) {
    return <ErrorMessage message={errorMessage} pressed={loadProducts} />;
  } */

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="staffNumber"
            label="Staff Number"
            labelStyle={{ color: "#000" }}
            errorText="Please enter a valid Staff Number!"
            keyboardType="default"
            autoCorrect={false}
            returnKeyType="next"
            onInputChange={inputChangedHandler}
            initialValue={editedStaff ? editedStaff.staffNumber : ""}
            initiallyValid={!!editedStaff}
            rules={{ required: true }}
          />
          <Input
            id="staffName"
            label="Staff Name"
            labelStyle={{ color: "#000" }}
            errorText="Please enter a valid Staff Name!"
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangedHandler}
            initialValue={editedStaff ? editedStaff.staffName : ""}
            initiallyValid={!!editedStaff}
            rules={{ required: true }}
          />
          <Input
            id="staffEmail"
            label="Staff Email"
            labelStyle={{ color: "#000" }}
            keyboardType="email-address"
            rules={{ required: true, isEmail: true }}
            autoCapitalize="none"
            errorText="Please enter a valid Email Address"
            onInputChange={inputChangedHandler}
            initialValue={editedStaff ? editedStaff.staffEmail : ""}
            initiallyValid={!!editedStaff}
          />
          <Input
            id="department"
            label="Department"
            labelStyle={{ color: "#000" }}
            errorText="Please enter a valid Department!"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            onInputChange={inputChangedHandler}
            initialValue={editedStaff ? editedStaff.department : ""}
            initiallyValid={!!editedStaff}
            rules={{ required: true }}
          />
          <Input
            id="salary"
            label="Salary (KES.)"
            labelStyle={{ color: "#000" }}
            errorText="Please enter a valid Salary!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangedHandler}
            initiallyValid={!!editedStaff}
            rules={{ required: true }}
            min={0.1}
            initialValue={editedStaff ? editedStaff.salary.toString() : ""}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const editStaffScreenOptions = (navData) => {
  // const submitFn = navData.route.params ? navData.route.params.submit : null;
  const routeParams = navData.route.params ? navData.route.params : {};

  return {
    headerTitle: routeParams.staffId ? "EDIT STAFF MEMBER" :  "ADD STAFF MEMBER ",
    headerTitleAlign: "center",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default EditStaffScreen;
