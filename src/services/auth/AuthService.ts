import {ILoginCredentials} from "../../interfaces/ILoginCredentials.interface";
import {IRegisterBody} from "../../interfaces/IRegisterBody.interface";
import HTTPError from "../../errors/HTTPError";
import JWTService, {IJWTService} from "../../authorization/JWTService";
import IAuthService from "../../interfaces/IAuthService.interface";
import IValidationService from "../../interfaces/IValidationService.interface";
import {IEmailService} from "../../interfaces/IEmailService.interface";
import IUsersRepository from "../../interfaces/IUsersRepository.interface";
import bcrypt from 'bcryptjs'
import {AuthMessages} from "../../enums/AuthMessages";
import {CookieOptions} from "express";
import keys from "../../config/keys";
import IRBACService from "../../interfaces/IRBACService.interface";
import RBACService, {Roles} from "../rbac/RBACService";

interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
}

interface IRegisterResponse {
    message: string;
    success: boolean;
    tokens: {accessToken: string, refreshToken: string} | undefined,
    packageId?: number
}

class AuthService implements IAuthService {
    constructor(private validationService: IValidationService, private emailService: IEmailService, private usersRepository: IUsersRepository,
                private jwtService: IJWTService = new JWTService(), private rbacService: IRBACService = new RBACService()) {
    }

    async login(credentials: ILoginCredentials): Promise<ILoginResponse> {
        const {errors, isValid} = this.validationService.login(credentials)
        if (!isValid) throw new HTTPError(errors, 'ValidationError','Bad request', 400)
        const user = await this.usersRepository.findByEmail(credentials.email)
        if (!user) throw new HTTPError({email: 'User does not exists'}, 'BadRequest', 'User does not exist', 400)

        const isMatch = await bcrypt.compare(credentials.password, user.password)
        if(!isMatch)throw new HTTPError({password: "Wrong password"}, 'ValidationError','Password doesnt match', 400)

        delete user.password
        return this.jwtService.generateAuthTokens(user)
    }

    async register(credentials: IRegisterBody, appUrl: string): Promise<IRegisterResponse> {
        const {errors, isValid} = this.validationService.register(credentials)
        if (!isValid) throw new HTTPError(errors, 'ValidationError','Bad request', 400, 'Invalid body', true)

        const existingUser = await this.usersRepository.findByInstagramAndEmail(credentials.instagram_username, credentials.email)

        if(existingUser) throw new HTTPError({instagram_username: "This user is already registered"}, 'BadRequest','User already exist', 400)

        let createdUser
        const hash = bcrypt.hashSync(credentials.password, 12)
        const token = this.jwtService.sign({...credentials, password: hash})
        if (!existingUser) createdUser = await this.usersRepository.createUser({...credentials, password: hash})

        let tokens
        if(createdUser) {
            tokens = this.jwtService.generateAuthTokens(createdUser)
            await this.rbacService.addUserRoles(createdUser.user_id, [Roles.END_USER])
        }

        try {
            const html = await this.confirmationLinkHtml(appUrl, token)
            await this.emailService.send({
                to: credentials.email,
                subject: AuthMessages.CONFIRMATION_LINK_EMAIL_SUBJECT,
                html: html
            })
        } catch (err) {
            throw new HTTPError(err.message, 'EmailError', 'Email sending error', 400)
        }

        return {message: AuthMessages.CONFIRMATION_LINK, success: true, tokens}
    }

    async registerRedirect(credentials: IRegisterBody): Promise<IRegisterResponse> {
        const user = await this.usersRepository.findByInstagramAndEmail(credentials.instagram_username, credentials.email)
        if (user) await this.usersRepository.updateActiveStatus(true, user.user_id)
        let tokens
        return {message: AuthMessages.CONFIRMATION_LINK, success: true, tokens}
    }

    setAuthCookies(tokens: { accessToken: string; refreshToken: string; }, cb: (name: string, value: any, options: CookieOptions) => any) {
        cb('accessToken', 'Bearer ' + tokens.accessToken, {maxAge: keys.jwt.accessToken.cookieMaxAge})
        cb('refreshToken', 'Bearer ' + tokens.refreshToken, {maxAge: keys.jwt.refreshToken.cookieMaxAge})
    }

    getUserPermissions(userId: number) {
        return this.rbacService.getUserPermissions(userId)
    }

    async confirmationLinkHtml(appUrl: string, token: string) {
        const body =  `<h2>Click the following link to confirm your account</h2>
        <br><p>
        <a style="flex: 1;
            padding: 10px 20px;
            border-radius: 7px;
            text-decoration: none;
            color: #ffffff;
            background-color: #8a5a4c;
            cursor: pointer;" href="${appUrl.replace(":5000", ":3000")}/register/${token}">
            Confirm account
            </a></p>`

        return this.emailService.useHTMLTemplate(body)
    }
}

export default AuthService
