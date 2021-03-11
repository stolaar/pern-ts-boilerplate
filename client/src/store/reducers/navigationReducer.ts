import {IReduxAction} from "../../interfaces/IReduxAction.interface";
import {SET_ACTIVE_TAB, SET_AUTH_CHECK} from "../actionTypes";

export interface INavigationState {
    activeTab: number | string;
    [k: string]: any
}

const initialState: INavigationState = {
    activeTab: 0
}

export default (state = initialState, action: IReduxAction): INavigationState => {
    switch (action.type) {
        case SET_AUTH_CHECK:
            return {...state, shouldCheckAuth: action.payload}
        case SET_ACTIVE_TAB:
            return {...state, activeTab: action.payload}
        default:
            return state;
    }
};
