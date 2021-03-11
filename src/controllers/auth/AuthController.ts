import express, {NextFunction, Request, RequestHandler, Response} from 'express'
import IControllerBase from '../../interfaces/IControllerBase.interface'
import IEndpoint from "../../interfaces/IEndpoint.interface";
import {ILoginCredentials} from "../../interfaces/ILoginCredentials.interface";
import {IRegisterBody} from "../../interfaces/IRegisterBody.interface";
import IAuthService from "../../interfaces/IAuthService.interface";
import isEmpty from 'lodash.isempty'
import passport from 'passport'
import jwtDecodeMiddleware from "../../middlewares/jwtDecode"
import IUsersService from "../../interfaces/IUsersService.interface";
import UsersService from "../../services/users/UsersService";

export interface IMiddlewares {
    authenticate: RequestHandler
}

interface IAuthMiddlewares extends IMiddlewares {
    setToken: RequestHandler,
    jwtDecode: RequestHandler
}

class Middlewares implements IMiddlewares {
    constructor() {
    }

    public authenticate = passport.authenticate('jwt', {session: false})
}

class AuthMiddlewares extends Middlewares implements IAuthMiddlewares {
    constructor() {
        super();
    }

    public setToken(req: Request, res: Response, next: NextFunction) {
        const {params: {token}} = req
        if (token) req.headers['authorization'] = 'Bearer ' + token
        next()
    }

    public jwtDecode = jwtDecodeMiddleware

}

class AuthController implements IControllerBase {
    public basePath = '/api/auth'
    public router = express.Router()

    public endpoints: Array<IEndpoint> = [
        {
            name: "CheckAuth",
            path: "/check",
            middlewares: [this.middlewares.authenticate],
            requestHandler: this.checkAuth.bind(this),
            method: "get"
        },
        {name: "LoginPage", path: "/login", requestHandler: this.login.bind(this), method: 'post'},
        {name: "RegisterPage", path: "/register", requestHandler: this.register.bind(this), method: 'post'},
        {
            name: "RegisterRedirect",
            path: "/register/redirect/:token",
            middlewares: [this.middlewares.setToken, this.middlewares.jwtDecode],
            requestHandler: this.registerRedirect.bind(this),
            method: 'get'
        },
        {
            name: "Logout",
            path: "/logout",
            requestHandler: this.logout.bind(this),
            method: 'get'
        },
        {
            name: "Get permissions",
            path: "/permissions",
            middlewares: [this.middlewares.authenticate],
            requestHandler: this.getPermissions.bind(this),
            method: 'get'
        },
        {
            name: "Get users",
            path: "/users",
            middlewares: [this.middlewares.authenticate],
            requestHandler: this.getAllUsers.bind(this),
            method: 'get'
        }
    ]

    constructor(private authService: IAuthService, private middlewares: IAuthMiddlewares = new AuthMiddlewares(),
                private usersService: IUsersService = new UsersService()) {
        this.initRoutes()
    }

    public initRoutes() {
        this.endpoints.forEach((endpoint: IEndpoint) => {
            if (!isEmpty(endpoint.middlewares) && endpoint.middlewares) this.router[endpoint.method](this.basePath + endpoint.path, ...endpoint.middlewares.map(el => el), endpoint.requestHandler)
            else this.router[endpoint.method](this.basePath + endpoint.path, endpoint.requestHandler)
        })
    }

    checkAuth(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(200).send({message: "OK"})
        } catch (err) {
            next(err)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password}: ILoginCredentials = req.body
            const result = await this.authService.login({email, password})
            this.authService.setAuthCookies(result, (name, value, options) => res.cookie(name, value, options))
            return res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const body: IRegisterBody = req.body
            const result = await this.authService.register(body, req.appUrl)
            if (result.tokens)
                this.authService.setAuthCookies({
                    accessToken: result.tokens.accessToken,
                    refreshToken: result.tokens.refreshToken
                }, (name, value, options) => res.cookie(name, value, options))

            return res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    }

    async registerRedirect(req: Request, res: Response, next: NextFunction) {
        try {
            const {user} = req
            if (user?.email) await this.authService.registerRedirect(user)
            return res.sendStatus(200)
        } catch (err) {
            next(err)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('accessToken')
            res.clearCookie('refreshToken')
            return res.sendStatus(200)
        } catch (err) {
            next(err)
        }
    }

    async getPermissions(req: Request, res: Response, next: NextFunction) {
        try {
            const { user: { user_id } } = req
            const permissions = await this.authService.getUserPermissions(user_id)
            return res.status(200).send(permissions)
        } catch (err) {
            next(err)
        }

    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const usersCount = await this.usersService.usersCount()
            return res.status(200).send(usersCount)
        } catch (err) {
            next(err)
        }
    }
}

export default AuthController
