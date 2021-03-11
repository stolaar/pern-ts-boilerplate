import React, { Fragment } from "react";
import {useDispatch} from "react-redux";
import {loginWithCredentials} from "../../../pages/auth/services/authActions";
import useForm from "../../../hooks/useForm";
import './Login.scss'
import InputField from "../../common/InputField";
import {forgot_password_route} from "../../../config/routes";
import {Link} from "react-router-dom";

function Login() {


    return <div className='login-form min-h-100'>
        <h3>Login</h3>
        <LoginForm />
    </div>
}


export function LoginForm() {
    const dispatch = useDispatch()


    const onLoginClick = (e: any) => {
        e.preventDefault()
        dispatch(loginWithCredentials(values))
    }

    const {values, handleSubmit, handleChange} = useForm({email: '', password: ''}, onLoginClick)

    return <Fragment>
        <form onSubmit={handleSubmit}>
            <InputField onChange={handleChange} value={values.email} name='email' placeholder='Enter your email'/>
            <InputField type='password' onChange={handleChange} value={values.password} name='password'
                        placeholder='Enter your password'/>
            <button className='btn btn-primary' type='submit'>Login</button>
            <div id='forgot-password'>
                <small><Link to={forgot_password_route.path}>Forgot password?</Link> Happens to the best!</small>
            </div>
        </form>
    </Fragment>
}

export default Login
