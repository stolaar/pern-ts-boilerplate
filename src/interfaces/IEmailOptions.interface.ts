export interface IEmailOptions {
    from?: string;
    to: string;
    subject: string;
    html: string;
    attachments?: Array<any>
}
