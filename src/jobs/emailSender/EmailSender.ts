import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";
const { EMAIL_ADDRESS, EMAIL_PASSWORD, EMAIL_HOST, NODE_ENV } = process.env;

const EmailSender: Mail = nodemailer.createTransport({
    host: EMAIL_HOST || "mail.privateemail.com",
    port: 587,
    auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD
    }
});

export default EmailSender
