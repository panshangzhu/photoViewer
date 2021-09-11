import createCachedSelector from "re-reselect";
import get from "lodash/get";

const extractUserData = (state) => state.userReducer;
const fetchUserData = createCachedSelector(
  extractUserData,
  (state, key) => key,
  (data, key) => get(data, key)
)((state, key) => key);
export const getUserPosts = (state) => fetchUserData(state, "posts");
export const getUserAlbums = (state) => fetchUserData(state, "albums");
