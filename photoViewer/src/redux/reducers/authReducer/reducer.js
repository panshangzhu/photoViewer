import { SET_ACTIVE_USER, SET_USERS, RESET_AUTH } from "./actionTypes";

const initialState = {
  // active user
  activeUser: {},
  users: [],
};

export const reducer = (state = initialState, action) => {
  const actionType = action.type;
  switch (actionType) {
    case SET_ACTIVE_USER:
      return {
        ...state,
        activeUser: action.payload.activeUser,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    case RESET_AUTH:
      return initialState;

    default:
      return state;
  }
};
