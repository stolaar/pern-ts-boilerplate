import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../../pages/auth/services/authActions";
import useForm from "../../../hooks/useForm";
import InputField from "../../common/InputField";
import {RootReducer} from "../../../store/rootReducer";
import {setToastMessage} from "../../../store/actions/feedbackActions";
import validateRegisterBody from "../../../validation/register";
import {setErrors} from "../../../store/actions/errorsActions";
import isEmpty from "lodash.isempty";
import {FormattedMessage, useIntl} from 'react-intl'
import {translate_placeholders} from "./translations/translations";

function Register() {
    const intl = useIntl()
    const placeholders = translate_placeholders(intl)
    const dispatch = useDispatch()
    const {errors, feedback} = useSelector((state: RootReducer) => state)

    const onRegisterClick = (e: any) => {
        e.preventDefault()
        const {isValid, errors} = validateRegisterBody(values)
        if (!isValid) {
            return dispatch(setErrors(errors))
        }
        dispatch(register({...values}))
    }

    const {values, handleSubmit, handleChange} = useForm({
        name: "",
        email: '',
        password: '',
        password2: ""
    }, onRegisterClick)

    useEffect(() => {
        if (errors.instagram_username && !isEmpty(values.instagram_username) && !isEmpty(values.email)) dispatch(setToastMessage({
            message: "Instagram username or email are already in use",
            isError: true
        }))
    }, [errors.instagram_username, dispatch, values.instagram_username, values.email])

    return <div className='login-form text-center'>
        <form onSubmit={handleSubmit}>
            <h3><FormattedMessage id='submit.register.details'
                                  defaultMessage='Submit your details in order to finish the process'/></h3>
            <InputField onChange={handleChange} value={values.name} name='name' placeholder={placeholders.name}
                        error={errors?.name}/>
            <InputField type='email' onChange={handleChange} value={values.email} name='email'
                        placeholder={placeholders.email}
                        error={errors?.email}/>
            <InputField onChange={handleChange} value={values.password} name='password'
                        placeholder={placeholders.password}
                        type='password'
                        error={errors?.password}/>
            <InputField onChange={handleChange} value={values.password2} name='password2'
                        type='password'
                        placeholder={placeholders.password2}
                        error={errors?.password2}/>
            <button id='register-btn' className='btn btn-primary' type='submit'><FormattedMessage id='register'
                                                                                                  defaultMessage='Register'/>
            </button>
            {feedback?.registerResponse?.success ? <ConfirmationLinkSent/> : null}
        </form>
    </div>
}


function ConfirmationLinkSent() {
    return <div className='mx-auto confirmation-link-sent'>
        <p><FormattedMessage id='confirmation.link.sent'
                             defaultMessage='Confirmation link has been sent! Please check your inbox and click the link in order to verify your
            account'/></p>
    </div>
}

export default Register
