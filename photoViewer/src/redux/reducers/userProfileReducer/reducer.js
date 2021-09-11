import { SET_USER_ALBUMS, SET_USER_POSTS } from "./actionTypes";

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
    default:
      return state;
  }
};
