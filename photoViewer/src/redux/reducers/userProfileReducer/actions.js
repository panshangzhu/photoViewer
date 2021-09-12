// Internal
import { getData } from "api/Api";
import {
  SET_USER_POSTS,
  SET_USER_ALBUMS,
  RESET_POSTS_ALBUMS,
} from "./actionTypes";

const _setPosts = (posts) => ({
  type: SET_USER_POSTS,
  payload: {
    posts,
  },
});

const _setAlbums = (albums) => ({
  type: SET_USER_ALBUMS,
  payload: {
    albums,
  },
});

export const resetPostsAlbums = () => ({
  type: RESET_POSTS_ALBUMS,
});

//  thunk: get user posts
export const fetchUserPosts = (userId) => (dispatch) => {
  return getData("/posts", {
    userId,
  })
    .then((posts) => {
      dispatch(_setPosts(posts));
      return Promise.resolve();
    })
    .catch((err) => window.alert(err));
};

//  thunk: get user albums
export const fetchUserAlbums = (userId) => (dispatch) => {
  return getData("/albums", {
    userId,
  })
    .then((albums) => {
      dispatch(_setAlbums(albums));
      return Promise.resolve();
    })
    .catch((err) => window.alert(err));
};
