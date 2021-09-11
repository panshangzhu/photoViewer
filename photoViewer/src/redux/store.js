import { createStore, applyMiddleware } from 'redux'

// middlewares
import thunk from "redux-thunk"
import { createLogger } from "redux-logger";
import { routerMiddleware } from "connected-react-router";

// utils
import { isProduction } from "utils/DevUtils";
import { createBrowserHistory } from "history";

// Internal
import rootReducers from 'redux/reducers/rootReducers'

export const AppHistory = createBrowserHistory({basename: process.env.PUBLIC_URL });

const loggerMiddleware = createLogger({
    collapsed: true,
})

let appliedMiddleware;
if(!isProduction) {
    appliedMiddleware = applyMiddleware(
        thunk,
        loggerMiddleware,
        routerMiddleware(AppHistory),
    )
} else {
    appliedMiddleware = applyMiddleware(
        thunk,
        routerMiddleware(AppHistory),
    )
}

const store = createStore(rootReducers(AppHistory), appliedMiddleware)

export default store;