import React from 'react'
import InputField from "../../components/common/InputField";
import useForm from "../../hooks/useForm";
import {useDispatch} from "react-redux";
import {forgotPassword} from "./services/actions";


function ForgotPassword() {
    const dispatch = useDispatch()

    const onForgotPassword = (e: any) => {
        e.preventDefault()
        dispatch(forgotPassword(values))
    }

    const {values, handleSubmit, handleChange} = useForm({email: ''}, onForgotPassword)

    return <section className='login-form min-h-100'>
        <form onSubmit={handleSubmit}>
            <h3>Forgot password</h3>
            <InputField onChange={handleChange} value={values.email} name='email' placeholder='Enter your email' />
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    </section>
}

export default ForgotPassword
