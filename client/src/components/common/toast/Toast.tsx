import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setToastMessage} from "../../../store/actions/feedbackActions";
import {RootReducer} from "../../../store/rootReducer";
import classnames from "classnames"
import './Toast.scss'
function Toast() {
    const dispatch = useDispatch()
    const {feedback: {showToast}} = useSelector((state: RootReducer) => state)

    useEffect(() => {
        setTimeout(() => {
            dispatch(setToastMessage(null))
        }, 2000)
    }, [dispatch])

    return <div
        className={classnames('toast-message-wrapper', {'toast-error': showToast?.isError})}>
        {showToast?.message}
    </div>
}

export default Toast
