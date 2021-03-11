import {Action, ActionCreator, Dispatch} from "redux";
import {SET_ERRORS} from "../actionTypes";
import {setToastMessage} from "./feedbackActions";
import {ThunkAction} from "redux-thunk";

export interface ISetErrorAction extends Action<typeof SET_ERRORS> {
    payload: any
}

export const setErrors: ActionCreator<ThunkAction<Promise<ISetErrorAction | any>, any, any, any>> | ActionCreator<void> = (err: any) => (dispatch: Dispatch<any>) => {
    if (err?.response?.status === 401) return ({type: SET_ERRORS, payload: {}})
    dispatch(setToastMessage({message: err?.response?.data?.short_message || 'Error occurred', isError: true }))
    return ({type: SET_ERRORS, payload: err?.response?.data?.info || err})
}
