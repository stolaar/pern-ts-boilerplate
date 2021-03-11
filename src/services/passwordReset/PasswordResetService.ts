import IPasswordResetService from "../../interfaces/IPasswordResetService.interface";
import IUsersRepository from "../../interfaces/IUsersRepository.interface";
import {db} from "../../db/db";
import isEmpty from 'lodash.isempty'
import HTTPError from "../../errors/HTTPError";
import JWTService, {IJWTService} from "../../authorization/JWTService";
import {PasswordResetMessages} from "../../enums/AuthMessages";
import {IEmailService} from "../../interfaces/IEmailService.interface";
import EmailService from "../email/EmailService";
import bcrypt from 'bcryptjs'
import IValidationService from "../../interfaces/IValidationService.interface";
import ValidationService from "../validation/ValidationService";

class PasswordResetService implements IPasswordResetService {
    constructor(private usersRepository: IUsersRepository = db.users,
                private jwtService: IJWTService = new JWTService(),
                private emailService: IEmailService = new EmailService(),
                private validationService: IValidationService = new ValidationService()) {}

    async forgotPassword(email: string, appUrl: string) {
        const user = await this.usersRepository.findByEmail(email)
        if(isEmpty(user)) throw new HTTPError({message: "User doesn't exist"}, 'BadRequest',"User doesn't exist", 400)
        const token = this.jwtService.sign({email, user_id: user.user_id})
        try {
            const html = await this.forgotPasswordEmailBody(appUrl, token)
            await this.emailService.send({
                to: email,
                subject: PasswordResetMessages.FORGOT_PASSWORD,
                html: html
            })
        } catch (err) {
            throw new HTTPError(err, 'EmailError','Email sending error', 400)
        }
        return 'ok'
    }

    async resetPassword(data: {password: string, password2: string; token: string; user: any}) {
        const user = await this.usersRepository.findByEmail(data.user.email)
        if(isEmpty(user)) throw new HTTPError({message: "User doesn't exist"}, 'BadRequest',"User doesn't exist", 400)
        const {errors, isValid} = this.validationService.passwordReset(data)
        if(!isValid) throw new HTTPError(errors, 'BadRequest',"Bad request", 400)

        const newPassword = await bcrypt.hash(data.password, 12)
        await this.usersRepository.updateUser({password: newPassword}, user.user_id)
        return 'ok'
    }

    async forgotPasswordEmailBody(appUrl: string, token: string) {
        const body =  `<h2>Click the following link to confirm your account</h2>
        <br><p>
        <a style="flex: 1;
            padding: 10px 20px;
            border-radius: 7px;
            text-decoration: none;
            color: #ffffff;
            background-color: #8a5a4c;
            cursor: pointer;" href="${appUrl.replace(":5000", ":3000")}/reset-password/${token}">
            Click here to reset your password
            </a></p>`

        return this.emailService.useHTMLTemplate(body)
    }

}

export default PasswordResetService
