import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {matchPath, Redirect, Route, RouteProps, useLocation} from "react-router";
import {RootReducer} from "../store/rootReducer";
import {checkAuth, getUserPermissions, setNextRoute} from "../pages/auth/services/authActions";
import Loader from "../components/common/loader/Loader";

interface IProtectedRouteProps extends RouteProps {
    path: string;
    component: React.FC,
    components?: any
}

function ProtectedRoute({path, component: Component, ...rest}: IProtectedRouteProps) {
    const {
        feedback: {showSpinner},
        auth: {isAuthenticated}
    } = useSelector((state: RootReducer) => state)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        if (matchPath(location.pathname, {path})) {
            dispatch(checkAuth())
            dispatch(getUserPermissions())
            dispatch(setNextRoute(path))
        }
    }, [dispatch, path, location])

    useEffect(() => {
        if(!isAuthenticated) dispatch(setNextRoute(path))
    }, [isAuthenticated, dispatch, path])

    return <Route path={path}
                  render={() => showSpinner ? <Loader show={true}/> : isAuthenticated ?
                      <Component {...rest} /> : <Redirect to={{pathname: '/login'}}/>}/>
}

export default ProtectedRoute
