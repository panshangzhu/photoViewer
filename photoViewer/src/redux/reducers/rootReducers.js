import { combineReducers } from "redux";
import {connectRouter} from "connected-react-router"

// reducers
import { reducer as authReducer }from "./authReducer/reducer"
import { reducer as userReducer } from "./userProfileReducer/reducer"

const rootReducers  = (history) => combineReducers({
    authReducer,
    userReducer,
    router: connectRouter(history)
}); 
export default rootReducers;