import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/common/loader/Loader";
import {registerRedirect} from "./services/authActions";
import {RootReducer} from "../../store/rootReducer";
import './RegisterConfirmation.css'
import {FormattedMessage} from "react-intl";

function RegisterConfirmation() {
    const {token}: { token: string } = useParams()
    const {auth: {registrationConfirmed}} = useSelector((state: RootReducer) => state)
    const [isLoading, setLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        token && dispatch(registerRedirect(token))
    }, [dispatch, token])

    useEffect(() => {
        if (registrationConfirmed) setLoading(false)
    }, [registrationConfirmed])

    return isLoading ? <Loader show={isLoading}/> : <RegisterSuccessful/>
}


function RegisterSuccessful() {
    return <div className='register-confirmation text-center'>
        <h2><FormattedMessage id='register.complete.heading' defaultMessage='Thank you for registering on our service'/>
        </h2>
        <p><FormattedMessage id='register.complete.body' defaultMessage='We are preparing your mistery box'/></p>
    </div>
}


export default RegisterConfirmation
