import {
  SET_STAFF_DATA,
  CREATE_STAFF,
  REMOVE_STAFF,
  UPDATE_STAFF,
} from "../actions/staff";
import Staff from "../../models/staff";

const initialState = {
  staff: [],
};

const staffReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STAFF_DATA:
      let loadedStaff = [];
      if (action.staffData) {
        loadedStaff = action.staffData.map(
          (staffMember) =>
            new Staff(
              staffMember._id,
              staffMember.staffNumber,
              staffMember.staffName,
              staffMember.staffEmail,
              staffMember.department,
              staffMember.salary
            )
        );
      }

      return {
        ...state,
        staff: loadedStaff,
      };
    case CREATE_STAFF:
      const newStaff = new Staff(
        action.staffId,
        action.staffData.staffNumber,
        action.staffData.staffName,
        action.staffData.staffEmail,
        action.staffData.department,
        action.staffData.salary
      );
      return {
        ...state,
        staff: state.staff.concat(newStaff),
      };
    case REMOVE_STAFF:
      return {
        ...state,
        staff: state.staff.filter(
          (staffMember) => staffMember.staffId !== action.staffId
        ),
      };
    case UPDATE_STAFF:
      const staffIndex = state.staff.findIndex(
        (staffMember) => staffMember.staffId === action.staffId
      );

      // console.log("updating reducer...")
      const updatedStaffMember = new Staff(
        action.staffId,
        action.staffData.staffNumber,
        action.staffData.staffName,
        action.staffData.staffEmail,
        action.staffData.department,
        action.staffData.salary
      );
      // console.log("nm", updatedStaffMember);

      const updatedStaff = [...state.staff];
      updatedStaff[staffIndex] = updatedStaffMember;
      // console.log("us", updatedStaff);

      return {
        ...state,
        staff: updatedStaff,
      };
    default:
      return state;
  }
};

export default staffReducer;
