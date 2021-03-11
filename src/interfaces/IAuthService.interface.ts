import {ILoginCredentials} from "./ILoginCredentials.interface";
import {ILoginResponse} from "../../client/src/interfaces/ILoginResponse.interface";
import {IRegisterBody} from "./IRegisterBody.interface";
import {CookieOptions} from "express";
import {IRegisterResponse} from "../../client/src/pages/auth/services/authActions";

interface IAuthService {
    login: (credentials: ILoginCredentials) => Promise<ILoginResponse>,
    register: (credentials: IRegisterBody, appUrl: string) => Promise<IRegisterResponse >,
    registerRedirect: (credentials: IRegisterBody) => Promise<{ message: string; success: boolean; }>,
    setAuthCookies: (tokens: ILoginResponse, cb: (name: string, value: any, options: CookieOptions) => any) => void,
    getUserPermissions: (userId: number) => any
}

export default IAuthService
