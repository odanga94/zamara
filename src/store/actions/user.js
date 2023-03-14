export const SET_USER_DATA = "SET_USER_DATA";
export const FETCH_USER_DATA = "FETCH_USER_DATA";

export const fetchUserData = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://dummyjson.com/users/${userId}`);

      // console.log("og", response);

      if (!response.ok) {
        const errorResData = await response.json();
        // console.log("res_err", errorResData);
        throw new Error(errorResData);
      }

      const resData = await response.json();
      // console.log("userRes", resData);

      dispatch(setUserData(resData));
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  };
};

export const setUserData = (userData) => {
  return (dispatch) => {
    const {
      firstName,
      lastName,
      age,
      gender,
      email,
      phone,
      birthDate,
      bloodGroup,
      height,
      weight,
      eyeColor,
    } = userData;

    dispatch({
      type: SET_USER_DATA,
      firstName,
      lastName,
      age,
      gender,
      email,
      phone,
      birthDate,
      bloodGroup,
      height,
      weight,
      eyeColor,
    });
  };
};
