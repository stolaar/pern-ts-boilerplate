import {IReduxAction} from "../../../interfaces/IReduxAction.interface";
import {
    SET_IS_AUTHENTICATED, SET_NEXT_ROUTE,
    SET_REGISTRATION_CONFIRM,
    SET_USER,
    SET_USER_PERMISSIONS
} from "../../../store/actionTypes";

interface IAuthState {
    user: {[k:string]: any};
    isAuthenticated: boolean;
    registrationConfirmed: boolean;
    permissions: Array<any>;
    navigation: {
        nextRoute: string;
    }
}

const initialState = {
    user: {},
    isAuthenticated: false,
    registrationConfirmed: false,
    permissions: [],
    navigation: {
        nextRoute: "/"
    }
}

export default (state: IAuthState = initialState, action: IReduxAction) => {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.payload};
        case SET_IS_AUTHENTICATED:
            return {...state, isAuthenticated: action.payload}
        case SET_REGISTRATION_CONFIRM:
            return {...state, registrationConfirmed: action.payload}
        case SET_USER_PERMISSIONS:
            return {...state, permissions: action.payload}
        case SET_NEXT_ROUTE:
            return {...state, navigation: {nextRoute: action.payload}}
        default:
            return state;
    }
};
