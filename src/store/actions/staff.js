import { sendEmail } from "../../utils";

export const SET_STAFF_DATA = "SET_STAFF_DATA";
export const CREATE_STAFF = "CREATE_STAFF";
export const REMOVE_STAFF = "REMOVE_STAFF";
export const UPDATE_STAFF = "UPDATE_STAFF";

const TOKEN = "b3dd05bff2e64cec81d61b1375b31343";

export const removeStaff = (staffId) => {
  return async (dispatch, getState) => {
    const staffDetails = getState().staff.staff.find(
      (staffMember) => staffMember.staffId === staffId
    );
    const staffEmail = staffDetails.staffEmail;
    const staffName = staffDetails.staffName;

    try {
      const response = await fetch(
        `https://crudcrud.com/api/${TOKEN}/zamara/${staffId}`,
        {
          method: "DELETE",
        }
      );

      await sendEmail(staffEmail, staffName, "deleted");

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

export const fetchStaff = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://crudcrud.com/api/${TOKEN}/zamara`);

      // console.log("og", response);

      /* if (!response.ok) {
        const errorResData = await response.json();
        // console.log("res_err", errorResData);
        throw new Error(errorResData);
      } */

      const resData = await response.json();
      // console.log("staffData", resData);

      dispatch(setStaffData(resData));
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  };
};

export const setStaffData = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_STAFF_DATA,
      staffData: data,
    });
  };
};

export const createStaff = (
  staffNumber,
  staffName,
  staffEmail,
  department,
  salary
) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://crudcrud.com/api/${TOKEN}/zamara`, {
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
      });

      const resData = await response.json();
      // console.log(resData);
      await sendEmail(staffEmail, staffName, "created");

      dispatch({
        type: CREATE_STAFF,
        staffId: resData._id,
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
  staffId,
  staffNumber,
  staffName,
  staffEmail,
  department,
  salary
) => {
  return async (dispatch) => {
    // console.log("sid", staffId);

    try {
      /* console.log("js", 
        JSON.stringify({
          staffNumber,
          staffName,
          staffEmail,
          department,
          salary,
        })
      ); */

      const response = await fetch(
        `https://crudcrud.com/api/${TOKEN}/zamara/${staffId}`,
        {
          method: "PUT",
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

      /* const resData = await response.json();
      console.log("uRes", resData); */

      // console.log("updating...")

      await sendEmail(staffEmail, staffName, "updated");

      dispatch({
        type: UPDATE_STAFF,
        staffId,
        staffData: {
          staffNumber,
          staffName,
          staffEmail,
          department,
          salary,
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
