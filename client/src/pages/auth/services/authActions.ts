import axios from 'axios'
import {Action, ActionCreator, Dispatch} from "redux";
import {
    SET_IS_AUTHENTICATED,
    SET_LOGOUT,
    SET_REGISTRATION_CONFIRM,
    SET_USER,
    SET_NEXT_ROUTE,
    SET_USER_ANSWERS, SET_USER_PERMISSIONS
} from "../../../store/actionTypes";
import {IUser} from "../../../interfaces/IUser.interface";
import {ThunkAction} from "redux-thunk";
import {
    check_auth_endpoint, get_user_permissions_endpoint, login_endpoint,
    logout_endpoint,
    register_endpoint,
    register_redirect_endpoint
} from "../../../config/api_endpoints";
import {setErrors} from "../../../store/actions/errorsActions";
import {IRegisterBody} from "../../../interfaces/IRegisterBody.interface";
import {
    ISetRegisterResponseAction,
    setRegisterResponse, showLoader
} from "../../../store/actions/feedbackActions";
import {ILoginCredentials} from "../../../interfaces/ILoginCredentials.interface";

export interface ILoginAction extends Action<typeof SET_USER> {
    payload: IUser
}

export interface IAuthAction extends Action<typeof SET_IS_AUTHENTICATED> {
    payload: boolean;
}

export interface INextRouteAction extends Action<typeof SET_NEXT_ROUTE> {
    payload: string;
}

export interface IRegisterResponse {
    message?: string;
    success: boolean;
    tokens?: {accessToken: string, refreshToken: string};
    packageId?: number
}

export const loginWithCredentials: ActionCreator<ThunkAction<Promise<ILoginAction>, IUser, null, ILoginAction>> | ActionCreator<void>
    = (credentials: ILoginCredentials) => async (dispatch: Dispatch<ILoginAction | any>) => {
    try {
        await axios.post(login_endpoint.path, credentials)
        dispatch(setAuthAction(true))
    } catch (err) {
        dispatch(setErrors(err))
    }
}

export const register: ActionCreator<ThunkAction<Promise<ISetRegisterResponseAction>, IRegisterResponse, null, ISetRegisterResponseAction>> | ActionCreator<void>
    = (body: IRegisterBody) => async (dispatch: Dispatch<ILoginAction | any>) => {
    try {
        dispatch(showLoader(true))
        const result: { data: IRegisterResponse } = await axios.post(register_endpoint.path, body)
        dispatch(showLoader(false))
        return dispatch(setRegisterResponse(result.data))
    } catch (err) {
        dispatch(showLoader(false))
        dispatch(setErrors(err))
    }
}

export const registerRedirect: ActionCreator<ThunkAction<Promise<ISetRegisterResponseAction>, IRegisterResponse, null, ISetRegisterResponseAction>> | ActionCreator<void>
    = (token: string) => async (dispatch: Dispatch<ILoginAction | any>) => {
    try {
        await axios.get(register_redirect_endpoint.path.replace(":token", token))
        dispatch(setRegistrationConfirmed(true))
    } catch (err) {
        dispatch(setErrors(err))
    }
}

export const checkAuth: ActionCreator<ThunkAction<Promise<ISetRegisterResponseAction>, any, null, IAuthAction>> | ActionCreator<void> = () => async (dispatch: Dispatch<IAuthAction | any>) => {
    try {
        dispatch(showLoader(true))
        await axios.get(check_auth_endpoint.path)
        dispatch(setAuthAction(true))
        dispatch(showLoader(false))
    } catch (err) {
        dispatch(showLoader(false))
        dispatch(setAuthAction(false))
        dispatch(setErrors(err))
    }
}

export interface ILogoutAction extends Action<typeof SET_LOGOUT> {
    payload: null
}

export interface ISetRegistrationConfirmed extends Action<typeof SET_REGISTRATION_CONFIRM>{payload: boolean}

export const setRegistrationConfirmed: ActionCreator<ISetRegistrationConfirmed> = (payload: boolean) => ({type: SET_REGISTRATION_CONFIRM, payload})

export const logout: ActionCreator<ThunkAction<Promise<ILogoutAction>, any, null, ILogoutAction>> | ActionCreator<void> =
    () => async (dispatch: Dispatch<ILogoutAction | any>) => {
    try {
        dispatch(showLoader(true))
        await axios.get(logout_endpoint.path)
        dispatch(setAuthAction(false))
        dispatch(showLoader(false))
    } catch (err) {
        dispatch(showLoader(false))
        dispatch(setAuthAction(false))
        dispatch(setErrors(err))
    }
}

export interface ISetUserAnswers extends Action<typeof SET_USER_ANSWERS>{payload: any}
export interface ISetUserPermissions extends Action<typeof SET_USER_PERMISSIONS>{payload: any}

export const setUserPermissions: ActionCreator<ISetUserPermissions> = (payload: any) => ({type: SET_USER_PERMISSIONS, payload})

export const getUserPermissions: ActionCreator<ThunkAction<any, any, any, ISetUserAnswers>> = () => async (dispatch: Dispatch<any>) => {
    try {
        const {data} = await axios.get(get_user_permissions_endpoint.path)
        dispatch(setUserPermissions(data))
    } catch (err) {
        dispatch(setErrors(err))
    }
}

export const setNextRoute: ActionCreator<INextRouteAction> = (payload: string) => ({type: SET_NEXT_ROUTE, payload})

export const setAuthAction: ActionCreator<IAuthAction> = (payload) => ({type: SET_IS_AUTHENTICATED, payload})
