// import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
// export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

let timer;

/* export const setDidTryAl = () => {
  return {
    type: SET_DID_TRY_AL,
  };
}; */

export const authenticate = (token, userId /* , expiryTime */) => {
  return (dispatch) => {
    // dispatch(setLogOutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      token,
      userId,
    });
  };
};

export const logIn = (userName = "kminchelle", password = "0lelplR") => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": 3495
        },
        body: JSON.stringify({
          userName,
          password,
          // returnSecureToken: true,
        }),
      });

      console.log("og", response);

      if (!response.ok) {
        const errorResData = await response.json();
        // const errorCode = errorResData.error.message;
        console.log("res_err", errorResData);
        /* let message = "Something went wrong 😞";
        if (errorCode === "EMAIL_NOT_FOUND") {
          message = "This Email could not be found in our database 😞";
        } else if (errorCode === "INVALID_PASSWORD") {
          message = "This password is not valid 😞";
        } */
        throw new Error(errorResData); 
      }

      const resData = await response.json();
      console.log("res", resData);

      /*       const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      ); */
      // console.log('exp', expirationDate);
      // await saveDataToStorage(resData.idToken, resData.localId, expirationDate);
      // console.log("saved");

      /* dispatch(
        authenticate(
          resData.idToken,
          resData.localId,
          +resData.expiresIn * 1000
        )
      ); */
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  };
};

/* const saveDataToStorage = (token, userId, expirationDate) => {
  return AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
}; */
/* 
export const signUp = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCK6BBfT63eUOXGf2EOKsYSyFxe__3qBU",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorResData = await response.json();
        const errorCode = errorResData.error.message;
        // console.log(errorResData);
        let message = "Something went wrong 😞";
        if (errorCode === "EMAIL_EXISTS") {
          message = "This Email already exists in our database 😞";
        }
        throw new Error(message);
      }

      const resData = await response.json();
      // console.log(resData);

      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
      await saveDataToStorage(resData.idToken, resData.localId, expirationDate);
      // console.log("saved");

      dispatch(
        authenticate(
          resData.idToken,
          resData.localId,
          +resData.expiresIn * 1000
        )
      );
    } catch (err) {
      throw err;
    }
  };
}; */

/* const setLogOutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logOut());
    }, expirationTime);
  };
}; */

export const logOut = () => {
  return async (dispatch) => {
    /* if (timer) {
      clearTimeout(timer);
    }
    await AsyncStorage.removeItem("userData"); */
    dispatch({
      type: LOGOUT,
    });
  };
};
