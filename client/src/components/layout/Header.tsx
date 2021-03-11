import React from "react";
import './Header.scss'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../store/rootReducer";
import {logout} from "../../pages/auth/services/authActions";
import {login_route} from "../../config/routes";

interface NavItemInterace {
    name: string;
    path?: string;
    onClick?: Function,
    component: Function,
    props: any
}
function NavButton({onClick, name}: { onClick: () => any, name: string }) {
    return <li className='nav-item' onClick={onClick}>{name}</li>
}

function NavLink({to, name}: {to: string; name: string;}) {
    return <li className='nav-item'><Link to={to}>{name}</Link></li>
}

const authLinks = (onLogout: () => void): NavItemInterace[] => ([{
    name: "Logout",
    onClick: onLogout,
    component: NavButton,
    props: {
        onClick: onLogout,
        name: "Logout"
    }
}])

const guestLinks = (): NavItemInterace[] => ([
    {
        name: "Login",
        component: NavLink,
        props: {
            to: login_route.path,
            name: login_route.name
        }
    }
])

function Header() {
    const {isAuthenticated} = useSelector((state: RootReducer) => state.auth)
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logout())
    }

    return <header>
        <ul>
            {isAuthenticated ? authLinks(onLogout).map(({component: Component, name, props}: NavItemInterace) => {
                return <Component key={name} {...props} >{name}</Component>
            }) : guestLinks().map(({component: Component, name, props}: NavItemInterace) => {
                return <Component key={name} {...props} >{name}</Component>
            })}
        </ul>
    </header>
}

export default Header
