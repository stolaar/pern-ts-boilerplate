import express, {NextFunction, Request, RequestHandler, Response} from 'express'
import IControllerBase from '../../interfaces/IControllerBase.interface'
import IEndpoint from "../../interfaces/IEndpoint.interface";
import isEmpty from 'lodash.isempty'
import passport from 'passport'
import jwtDecodeMiddleware from "../../middlewares/jwtDecode"
import IUsersService from "../../interfaces/IUsersService.interface";
import UsersService from "../../services/users/UsersService";

export interface IMiddlewares {
    authenticate: RequestHandler
}

interface IUsersControllerMiddlewares extends IMiddlewares {
    setToken: RequestHandler,
    jwtDecode: RequestHandler
}

class Middlewares implements IMiddlewares {
    constructor() {
    }

    public authenticate = passport.authenticate('jwt', {session: false})
}

class UsersControllerMiddlewares extends Middlewares implements IUsersControllerMiddlewares {
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

class UsersController implements IControllerBase {
    public basePath = '/api/users'
    public router = express.Router()

    public endpoints: Array<IEndpoint> = [
        {
            name: "GetUserDetails",
            path: "/user/details",
            middlewares: [this.middlewares.authenticate],
            requestHandler: this.getUserDetails.bind(this),
            method: 'get'
        }
    ]
    constructor(private usersService: IUsersService = new UsersService(), private middlewares: IUsersControllerMiddlewares = new UsersControllerMiddlewares()) {
        this.initRoutes()
    }

    public initRoutes() {
        this.endpoints.forEach((endpoint: IEndpoint) => {
            if (!isEmpty(endpoint.middlewares) && endpoint.middlewares) this.router[endpoint.method](this.basePath + endpoint.path, ...endpoint.middlewares.map(el => el), endpoint.requestHandler)
            else this.router[endpoint.method](this.basePath + endpoint.path, endpoint.requestHandler)
        })
    }

    async getUserDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const {user: {email, id}} = req
            const result = await this.usersService.getUserDetails(email, id)
            return res.status(200).send(result)
        } catch (err) {
            next(err)
        }
    }
}

export default UsersController
