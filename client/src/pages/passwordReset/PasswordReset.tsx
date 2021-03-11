import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from "react-router";
import InputField from "../../components/common/InputField";
import useForm from "../../hooks/useForm";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "./services/actions";
import validatePasswordReset from "../../validation/passwordReset";
import {RootReducer} from "../../store/rootReducer";
import {login_route} from "../../config/routes";
import {setFeedback} from "../../store/actions/feedbackActions";

// TODO: ADD TRANSLATIONS
function PasswordReset() {
    const [errors, setErrors] = useState({password: '', password2: ''})
    const {token} = useParams<{token?: string}>()
    const dispatch = useDispatch()
    const {feedback: {message}} = useSelector((state: RootReducer) => state)
    const history = useHistory()

    const onResetPassword = (e: any) => {
        e.preventDefault()
        const {errors, isValid} = validatePasswordReset(values)
        if(!isValid){
            setErrors(errors)
            return
        }
        dispatch(resetPassword({...values, token}))
    }
    const {values, handleSubmit, handleChange} = useForm({password: '', password2: ''}, onResetPassword)

    useEffect(() => {
        if(message) history.push(login_route.path)
    }, [message, history])

    useEffect(() => {
        return () => {
            dispatch(setFeedback({message: ''}))
        }
    }, [dispatch])

    return <section className='login-form'>
        <form onSubmit={handleSubmit}>
            <h3>Reset your password</h3>
            <InputField error={errors.password} type='password' onChange={handleChange} value={values.password} name='password' placeholder='Enter new password' />
            <InputField error={errors.password2} type='password' onChange={handleChange} value={values.password2} name='password2' placeholder='Confirm password' />
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    </section>

}

export default PasswordReset
