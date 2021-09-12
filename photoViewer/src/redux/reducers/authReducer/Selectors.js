import createCachedSelector from "re-reselect";

const extractAuth = (state) => state.authReducer;
const fetchAuthData = createCachedSelector(
  extractAuth,
  (state, key) => key,
  (data, key) => data[key]
)((state, key) => key);
export const getActiveUser = (state) => fetchAuthData(state, "activeUser");
export const getUsers = (state) => fetchAuthData(state, "users");
export const getUserNamesAndIds = (state) =>
  getUsers(state).map((user) => ({ id: user.id, name: user.name, username: user.username }));
