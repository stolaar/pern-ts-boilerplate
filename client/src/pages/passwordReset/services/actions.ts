import {ActionCreator, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {setFeedback, setToastMessage, showLoader} from "../../../store/actions/feedbackActions";
import axios from "axios";
import {forgot_password_endpoint, reset_password_endpoint} from "../../../config/api_endpoints";
import {setErrors} from "../../../store/actions/errorsActions";
import {ILogoutAction} from "../../auth/services/authActions";


export const forgotPassword: ActionCreator<ThunkAction<Promise<ILogoutAction>, any, null, any>> | ActionCreator<void> =
    (data: {email: string}) => async (dispatch: Dispatch<any>) => {
        try {
            dispatch(showLoader(true))
            await axios.post(forgot_password_endpoint.path, data)
            dispatch(setToastMessage({message: "Request sent!", isError: false}))
            dispatch(showLoader(false))
        } catch (err) {
            dispatch(showLoader(false))
            dispatch(setToastMessage({message: err?.response?.data?.message, isError: true}))
            dispatch(setErrors(err?.response?.data?.info || err))
        }
    }

export const resetPassword: ActionCreator<ThunkAction<Promise<ILogoutAction>, any, null, any>> | ActionCreator<void> =
    (data: {password: string, password2: string, token: string}) => async (dispatch: Dispatch<any>) => {
        try {
            dispatch(showLoader(true))
            await axios.post(reset_password_endpoint.path.replace(":token", data.token), data)
            dispatch(setFeedback({message: "Password reset done"}))
            dispatch(showLoader(false))
        } catch (err) {
            dispatch(showLoader(false))
            dispatch(setToastMessage({message: err?.response?.data?.message, isError: true}))
            dispatch(setErrors(err?.response?.data?.info || err))
        }
    }
