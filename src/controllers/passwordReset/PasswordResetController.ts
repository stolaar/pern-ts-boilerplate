import express, {NextFunction, Request, RequestHandler, Response} from 'express'
import IControllerBase from '../../interfaces/IControllerBase.interface'
import IEndpoint from "../../interfaces/IEndpoint.interface";
import isEmpty from 'lodash.isempty'
import passport from 'passport'
import jwtDecodeMiddleware from "../../middlewares/jwtDecode"
import IPasswordResetService from "../../interfaces/IPasswordResetService.interface";
import PasswordResetService from "../../services/passwordReset/PasswordResetService";

export interface IMiddlewares {
    authenticate: RequestHandler
}

interface IPasswordResetMiddlewares extends IMiddlewares {
    setToken: RequestHandler,
    jwtDecode: RequestHandler,
    test: RequestHandler
}

class Middlewares implements IMiddlewares {
    constructor() {
    }

    public authenticate = passport.authenticate('jwt', {session: false})
}

class PasswordResetMiddlewares extends Middlewares implements IPasswordResetMiddlewares {
    constructor() {
        super();
    }

    public setToken(req: Request, res: Response, next: NextFunction) {
        const {params: {token}} = req
        if (token) req.headers['authorization'] = 'Bearer ' + token
        next()
    }

    public jwtDecode = jwtDecodeMiddleware

    public test = (req: Request, res: Response, next: NextFunction) => {
        console.log("req", req.headers)
        next()
    }

}

class PasswordResetController implements IControllerBase {
    public basePath = '/api/password-reset'
    public router = express.Router()

    public endpoints: Array<IEndpoint> = [
        {
            name: "ForgotPassword",
            path: "/forgot-password",
            requestHandler: this.forgotPassword.bind(this),
            method: 'post'
        },
        {
            name: "ResetPassword",
            path: "/reset/:token",
            middlewares: [this.middlewares.setToken, this.middlewares.jwtDecode],
            requestHandler: this.resetPassword.bind(this),
            method: "post"
        },
    ]
    constructor(private passwordResetService: IPasswordResetService = new PasswordResetService(), private middlewares: IPasswordResetMiddlewares = new PasswordResetMiddlewares()) {
        this.initRoutes()
    }

    public initRoutes() {
        this.endpoints.forEach((endpoint: IEndpoint) => {
            if (!isEmpty(endpoint.middlewares) && endpoint.middlewares) this.router[endpoint.method](this.basePath + endpoint.path, ...endpoint.middlewares.map(el => el), endpoint.requestHandler)
            else this.router[endpoint.method](this.basePath + endpoint.path, endpoint.requestHandler)
        })
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const {email} = req.body
            const result = await this.passwordResetService.forgotPassword(email, req.appUrl)
            return res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const {user, body} = req
            await this.passwordResetService.resetPassword({user, ...body})
            return res.sendStatus(200)
        } catch (err) {
            next(err)
        }
    }
}

export default PasswordResetController
