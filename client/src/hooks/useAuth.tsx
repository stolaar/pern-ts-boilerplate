import {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootReducer} from "../store/rootReducer";
import {useHistory} from "react-router";
import {login_route} from "../config/routes";

const useAuth = () => {
    const {auth: {isAuthenticated, navigation: {nextRoute}}} = useSelector((state: RootReducer) => state)
    const history = useHistory()

    useEffect(() => {
        isAuthenticated ? history.push(nextRoute) : history.push(login_route.path)
    }, [isAuthenticated, nextRoute, history])
}

export default useAuth
