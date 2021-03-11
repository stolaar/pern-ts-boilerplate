export type HTTPMethod = 'post' | 'get'

interface IEndpoint {
    path: string;
    method: HTTPMethod;
}

export const login_endpoint: IEndpoint = {path: "/api/auth/login", method: 'post'}
export const register_endpoint: IEndpoint = {path: "/api/auth/register", method: 'post'}
export const check_auth_endpoint: IEndpoint = {path: "/api/auth/check", method: 'get'}
export const logout_endpoint: IEndpoint = {path: "/api/auth/logout", method: 'get'}
export const register_redirect_endpoint: IEndpoint = {path: "/api/auth/register/redirect/:token", method: 'get'}
export const get_user_permissions_endpoint: IEndpoint = {path: "/api/auth/permissions", method: 'get'}
export const get_users_endpoint: IEndpoint = {path: "/api/auth/users", method: 'get'}
export const forgot_password_endpoint: IEndpoint = {path: "/api/password-reset/forgot-password", method: 'post'}
export const reset_password_endpoint: IEndpoint = {path: "/api/password-reset/reset/:token", method: 'post'}
export const user_details_endpoint: IEndpoint = {path: "/api/users/user/details", method: 'get'}
