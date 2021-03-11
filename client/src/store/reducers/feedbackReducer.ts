import {IReduxAction} from "../../interfaces/IReduxAction.interface";
import {SET_FEEDBACK, SET_LOADER, SET_REGISTER_RESPONSE, SET_TOAST_MESSAGE} from "../actionTypes";
import {IRegisterResponse} from "../../pages/auth/services/authActions";

export interface IFeedbackState {
    message?: string;
    registerResponse?: IRegisterResponse;
    showSpinner: boolean;
    showToast?: { message: string, isError: boolean } | null
}

const initialState: IFeedbackState = {
    showSpinner: false,
    showToast: null
}

export default (state = initialState, action: IReduxAction): IFeedbackState => {
    switch (action.type) {
        case SET_FEEDBACK:
            return {...state, message: action.payload}
        case SET_REGISTER_RESPONSE:
            return {...state, registerResponse: action.payload}
        case SET_LOADER:
            return {...state, showSpinner: action.payload}
        case SET_TOAST_MESSAGE:
            return {...state, showToast: action.payload}
        default: return state;
    }
};
