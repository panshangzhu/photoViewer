import { combineReducers } from "redux";
import {connectRouter} from "connected-react-router"

// reducers
import { reducer as authReducer }from "./authReducer/reducer"

const rootReducers  = (history) => combineReducers({
    authReducer,
    router: connectRouter(history)
}); 
export default rootReducers;