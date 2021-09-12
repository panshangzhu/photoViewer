import { SET_USERNAME, SET_USERS } from "./actionTypes";

const initialState = {
  photos: "",
  users: [],
};

export const reducer = (state = initialState, action) => {
  const actionType = action.type;
  switch (actionType) {
    case SET_USERNAME:
      return {
        ...state,
        userName: action.payload.userName,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
};
