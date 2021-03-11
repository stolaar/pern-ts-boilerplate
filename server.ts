import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './src/middlewares/logger'

import authController from './src/controllers/auth/index'
import {errorHandler} from "./src/errors/ErrorHandler";
import appUrlResolver from "./src/middlewares/appUrlResolver";
import cookieToAuthHeader from "./src/middlewares/cookieToAuthHeader";
import cookieParser from "cookie-parser";
import PasswordResetController from "./src/controllers/passwordReset/PasswordResetController";
import UsersController from "./src/controllers/users/UsersController";


const app = new App({
    port: process.env.PORT || 5000,
    controllers: [
        authController,
        new PasswordResetController(),
        new UsersController()
    ],
    middleWares: [
        cookieParser(),
        cookieToAuthHeader,
        appUrlResolver,
        bodyParser.json(),
        bodyParser.urlencoded({extended: true}),
        loggerMiddleware
    ],
    errorHandler
})

app.listen()
