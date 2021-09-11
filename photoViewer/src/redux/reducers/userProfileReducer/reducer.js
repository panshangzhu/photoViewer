import { SET_USERNAME } from "./actionTypes"

const initialState = {
    userName: ""
}

export const reducer = (state = initialState, action) => {
    const actionType = action.type;
    switch(actionType) {
    case SET_USERNAME:
      return  {
        userName: action.payload.userName
    }
    default:
        return state;
    }
}