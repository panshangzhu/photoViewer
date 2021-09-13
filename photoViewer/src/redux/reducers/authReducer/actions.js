// External
import { push } from "connected-react-router";

// Internal
import { getData } from "api/Api";
import { resetPostsAlbums } from "redux/reducers/userProfileReducer/actions";
import { SET_ACTIVE_USER, SET_USERS, RESET_AUTH } from "./actionTypes";

export const updateActiveUser = (activeUser) => ({
  type: SET_ACTIVE_USER,
  payload: {
    activeUser,
  },
});

const _setUsers = (users) => ({
  type: SET_USERS,
  payload: {
    users,
  },
});

export const resetAuth = () => ({
  type: RESET_AUTH,
});

// Thunk fetch api the get users for authetication
export const getUsers = () => (dispatch, getState) => {
  return getData("/users")
    .then((users) => {
      dispatch(_setUsers(users));
    })
    .catch((err) => {
      window.alert(err);
    });
};

// Thunk, process user logout
export const logout = () => (dispatch) => {
  dispatch(resetPostsAlbums());
  dispatch(resetAuth());
  dispatch(push("/"));
};
