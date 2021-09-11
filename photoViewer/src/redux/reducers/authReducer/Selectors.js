import createCachedSelector from "re-reselect"
import get from "lodash/get"

const extractAuth = (state) => state.authReducer;
const fetchAuthData = createCachedSelector(
    extractAuth,
    (state, key) => key,
    (data, key) => get(data, key)
)(
    (state, key) => key
);
export const getUserName = (state) => fetchAuthData(state, 'userName')