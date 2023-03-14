export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (token, userId) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      token,
      userId,
    });
  };
};

export const logIn = (username, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // console.log("og", response);

      if (!response.ok) {
        const errorResData = await response.json();
        // const errorCode = errorResData.error.message;
        // console.log("res_err", errorResData);
        throw new Error(errorResData.message);
      }

      const resData = await response.json();
      // console.log("res", resData);

      dispatch(
        authenticate(
          resData.token,
          resData.id
        )
      );
    } catch (err) {
      // console.log("err", err);
      throw err;
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
};
