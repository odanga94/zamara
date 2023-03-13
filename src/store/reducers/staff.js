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
      return {
        ...state,
        staff: action.staffData,
      };
    case CREATE_STAFF:
      const newStaff = new Staff(
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
          (staffMember) => staffMember.staffNumber !== action.staffId
        ),
      };
    case UPDATE_STAFF:
      const staffIndex = state.staff.findIndex(
        (staffMember) => staffMember.staffNumber === action.staffData.sId
      );

      // console.log("updating reducer...")
      const updatedStaffMember = new Staff(
        action.staffData.staffNumber,
        action.staffData.staffName,
        action.staffData.staffEmail,
        action.staffData.department,
        action.staffData.salary
      );
      console.log("nm", updatedStaffMember);

      const updatedStaff = [...state.staff];
      updatedStaff[staffIndex] = updatedStaffMember;
      console.log("us", updatedStaff);

      return {
        ...state,
        staff: updatedStaff,
      };
    default:
      return state;
  }
};

export default staffReducer;
