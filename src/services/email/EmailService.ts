import {IEmailService} from "../../interfaces/IEmailService.interface";
import EmailSender from "../../jobs/emailSender/EmailSender";
import {IEmailOptions} from "../../interfaces/IEmailOptions.interface";
import Mail from "nodemailer/lib/mailer";
import fs from 'fs'

const {EMAIL_ADDRESS} = process.env;


class EmailService implements IEmailService {
    private email: string = EMAIL_ADDRESS || 'default@email.com'

    constructor(private emailSender: Mail = EmailSender) {}

    async send(emailOptions: IEmailOptions) {
        emailOptions.from = emailOptions.from || this.email
        return this.emailSender.sendMail(emailOptions)
    }

    // TODO: make this to be generic
    useHTMLTemplate(body: string) {
        return new Promise((resolve, reject) => {
            fs.readFile('./src/services/email/templates/confirmation.html', 'utf8', (err: any, data: string) => {
                if(err) return reject()
                data = data.replace("{{CONTENT}}", body)
                body = data
                return resolve(body)
            })
        })
    }
}

export default EmailService
export const emailService = new EmailService(EmailSender)
