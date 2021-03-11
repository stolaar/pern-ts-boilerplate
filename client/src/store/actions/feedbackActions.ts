import {Action, ActionCreator} from "redux";
import {SET_FEEDBACK, SET_LOADER, SET_REGISTER_RESPONSE, SET_TOAST_MESSAGE} from "../actionTypes";
import {IRegisterResponse} from "../../pages/auth/services/authActions";

export interface IFeedback {
    [k: string]: any
}

export interface IFeedbackAction extends Action<typeof SET_FEEDBACK> {
    payload: IFeedback
}

export interface ISetToastMessage extends Action<typeof SET_TOAST_MESSAGE> {payload: {message: string, isError?: boolean} | null}

export interface IShowLoaderAction extends Action<typeof SET_LOADER> {
    payload: boolean;
}

export interface ISetRegisterResponseAction extends Action<typeof SET_REGISTER_RESPONSE> {
    payload: IRegisterResponse
}

export const setFeedback: ActionCreator<IFeedbackAction> = (payload: IFeedback) => ({type: SET_FEEDBACK, payload})
export const showLoader: ActionCreator<IShowLoaderAction> = (payload: boolean) => ({type: SET_LOADER, payload})

export const setRegisterResponse: ActionCreator<ISetRegisterResponseAction> = (payload: IRegisterResponse) => ({
    type: SET_REGISTER_RESPONSE,
    payload
})

export const setToastMessage:  ActionCreator<ISetToastMessage> = (payload: { message: string, isError?: boolean } | null) => ({type: SET_TOAST_MESSAGE, payload})
