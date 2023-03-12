import { SET_USER_DATA } from "../actions/user";

const initialState = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  email: "",
  phone: "",
  birthDate: "",
  bloodGroup: "",
  height: "",
  weight: "",
  eyeColor: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        age: action.age,
        gender: action.gender,
        email: action.email,
        phone: action.phone,
        birthDate: action.birthDate,
        bloodGroup: action.bloodGroup,
        height: action.height,
        weight: action.weight,
        eyeColor: action.eyeColor,
      };
    default:
      return state;
  }
};

export default userReducer;
