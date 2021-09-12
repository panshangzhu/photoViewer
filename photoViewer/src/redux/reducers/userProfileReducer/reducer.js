import {
  SET_USER_ALBUMS,
  SET_USER_POSTS,
  RESET_POSTS_ALBUMS,
} from "./actionTypes";

const initialState = {
  posts: [],
  albums: [],
};

export const reducer = (state = initialState, action) => {
  const actionType = action.type;
  switch (actionType) {
    case SET_USER_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
      };
    case SET_USER_ALBUMS:
      return {
        ...state,
        albums: action.payload.albums,
      };
    case RESET_POSTS_ALBUMS:
      return initialState;
    default:
      return state;
  }
};
