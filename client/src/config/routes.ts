import {FunctionComponent} from "react";
import Login from "../components/auth/login/Login";
import Register from "../components/auth/register/Register";
import RegisterConfirmation from "../pages/auth/RegisterConfirmation";
import ForgotPassword from "../pages/passwordReset/ForgotPassword";
import PasswordReset from "../pages/passwordReset/PasswordReset";
import LandingPage from "../pages/landing/LandingPage";

interface Route {
    readonly path: string;
    readonly name: string;
    exact?: boolean;
    roleBased?: boolean;
    redirect?: string;
    component: FunctionComponent<any>;
    fallbackComponent?:  FunctionComponent<any>;
    components?:  {[k: number]: FunctionComponent<any>}
}

export const landing_route: Route = { path: "/", name: "Reset Password", component: LandingPage }
export const login_route: Route = { path: "/login", name: "Login", component: Login }
export const register_route: Route = { path: "/register", name: "Register", component: Register }
export const register_confirmation_route: Route = { path: "/register/:token", name: "Register Confirmation", component: RegisterConfirmation }
export const forgot_password_route: Route = { path: "/forgot-password", name: "Forgot Password", component: ForgotPassword }
export const reset_password_route: Route = { path: "/reset-password/:token", name: "Reset Password", component: PasswordReset }



export const public_routes: Route[] = [register_confirmation_route,landing_route]
export const private_routes: Route[] = []
export const guest_routes: Route[] = [login_route, register_route,reset_password_route, forgot_password_route]
