import createCachedSelector from "re-reselect";
import get from "lodash/get";

const extractAuth = (state) => state.authReducer;
const fetchAuthData = createCachedSelector(
  extractAuth,
  (state, key) => key,
  (data, key) => get(data, key)
)((state, key) => key);
export const getUserName = (state) => fetchAuthData(state, "userName");
export const getUsers = (state) => fetchAuthData(state, "users");
export const getAuthUserNames = (state) =>
  getUsers(state).map((user) => user.username);
export const getUserDetail = (state) =>
  getUsers(state).find((user) => user.username === getUserName(state));
export const getActiveUserId = (state) => getUserDetail(state)?.id;
