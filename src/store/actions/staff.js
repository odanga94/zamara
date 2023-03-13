import { staffData } from "../../utils/dummy-data";

export const SET_STAFF_DATA = "SET_STAFF_DATA";
// export const FETCH_USER_DATA = "FETCH_USER_DATA";
export const CREATE_STAFF = "CREATE_STAFF";
export const REMOVE_STAFF = "REMOVE_STAFF";
export const UPDATE_STAFF = "UPDATE_STAFF";

export const removeStaff = (staffId) => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token;
    try {
      /* const response = await fetch(
        `https://shop-app-6fea1-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong 😞");
      }
 */
      dispatch({
        type: REMOVE_STAFF,
        staffId,
      });
    } catch (err) {
      // send to custom analytics server
      console.log(err.message);
      throw new Error(err);
    }
  };
};

/* export const fetchUserData = (userId) => {
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

      /*       const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
          ); 
      // console.log('exp', expirationDate);
      // await saveDataToStorage(resData.idToken, resData.localId, expirationDate);
      // console.log("saved");

      dispatch(setUserData(resData));
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  };
}; */

export const createStaff = (
  staffNumber,
  staffName,
  staffEmail,
  department,
  salary
) => {
  return async (dispatch, getState) => {
    // execute any async code you want
    /*  const token = getState().auth.token;
      const userId = getState().auth.userId; */
    try {
      const response = await fetch(
        `https://crudcrud.com/api/8f9fefc35a784ef2ab1225101dcd405b/zamara`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            staffNumber,
            staffName,
            staffEmail,
            department,
            salary,
          }),
        }
      );

      /* if (!response.ok) {
        console.log("res", response);
        throw new Error("Something went wrong 😞");
      } */

      const resData = await response.json();
      console.log(resData)

      dispatch({
        type: CREATE_STAFF,
        staffData: {
          staffNumber,
          staffName,
          staffEmail,
          department,
          salary,
        },
      });
    } catch (err) {
      console.log(err.message);
      throw new Error(err);
    }
  };
};

export const updateStaff = (
  staffNumber,
  staffName,
  staffEmail,
  department,
  salary,
  sId
) => {
  return async (dispatch, getState) => {
    // const token = getState().auth.token;
    try {
      /* const response = await fetch(
        `https://shop-app-6fea1-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
          }),
        }
      );
 
      if (!response.ok) {
        throw new Error("Something went wrong 😞");
      } */
      // console.log("updating...")
      dispatch({
        type: UPDATE_STAFF,
        staffData: {
          staffNumber,
          staffName,
          staffEmail,
          department,
          salary,
          sId,
        },
      });
      // console.log("updated...")
    } catch (err) {
      // send to custom analytics server
      console.log(err.message);
      throw new Error(err);
    }
  };
};

export const setStaffData = () => {
  return (dispatch) => {
    dispatch({
      type: SET_STAFF_DATA,
      staffData: /* staffData */ [],
    });
  };
};
