import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect, Route, RouteProps, useHistory, useLocation, matchPath} from "react-router";
import {RootReducer} from "../store/rootReducer";
import {checkAuth, setNextRoute} from "../pages/auth/services/authActions";
import Loader from "../components/common/loader/Loader";

interface IGuestRouteProps extends RouteProps {
    path: string;
    component: React.FC
}

function GuestRoute({path, component: Component, ...rest}: IGuestRouteProps) {
    const {
        feedback: {showSpinner},
        auth: {isAuthenticated, navigation: {nextRoute}}
    } = useSelector((state: RootReducer) => state)
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        if (matchPath(location.pathname, {path})) {
            dispatch(checkAuth())
        }
    }, [dispatch, path, location])

    useEffect(() => {
        if(isAuthenticated) history.push(nextRoute)
    }, [isAuthenticated, history, nextRoute])

    useEffect(() => {
        return () => {
            dispatch(setNextRoute("/"))
        }
    }, [dispatch])

    return <Route path={path}
                  render={() => showSpinner ? <Loader show={true}/> : !isAuthenticated ?
                      <Component {...rest} /> : <Redirect to={{pathname: nextRoute}}/>}/> // TODO: test if this can end in a loop
}

export default GuestRoute
