import React, {useReducer, Fragment, useCallback, useEffect} from 'react';

import Input from '../Input';
import styles from './styles';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    let updatedFormIsValid = true;
    const updatedValues = {
      ...state.inputValues,
      [action.inputLabel]: action.value,
    };
    const updatedInputValidities = {
      ...state.inputValidities,
      [action.inputLabel]: action.isValid,
    };
    for (let key in updatedInputValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedInputValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const SignInWithEmailForm = (props) => {
  const {setFormIsValid, setCredentials} = props;
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      userName: '',
      password: '',
    },
    inputValidities: {
      userName: false,
      password: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputLabel, value, validity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: value.trim(),
        isValid: validity,
        inputLabel,
      });
    },
    [dispatchFormState],
  );

  useEffect(() => {
    setFormIsValid(formState.formIsValid);
    setCredentials({...formState.inputValues});
  }, [formState, setFormIsValid, setCredentials]);

  return (
    <Fragment>
      <Input
        id="userName"
        label="User Name:"
        keyboardType="default"
        autoCapitalize="none"
        errorText="Please enter a valid user name."
        onInputChange={inputChangeHandler}
        initialValue=""
        style={styles.textInput}
        rules={{required: true}}
        secureTextEntry={false}
        initiallyValid={false}
      />
      <Input
        id="password"
        label="Password:"
        keyboardType="default"
        secureTextEntry
        autoCapitalize="none"
        errorText="Please enter a valid password."
        onInputChange={inputChangeHandler}
        initialValue=""
        style={styles.textInput}
        rules={{required: true}}
        initiallyValid={false}
      />
    </Fragment>
  );
};

export default SignInWithEmailForm;
