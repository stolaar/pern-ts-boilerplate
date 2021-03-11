import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

declare const window: {
    __REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__?: any;
    __REDUX_DEVTOOLS_EXTENSION__?: any;
}

const composeEnhancers: any = window?.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;

const reduxExtension =
    process.env.NODE_ENV === "development"
        ? window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (dummy: any) => dummy
        : (dummy: any) => dummy;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk), reduxExtension)
);

export default store;
