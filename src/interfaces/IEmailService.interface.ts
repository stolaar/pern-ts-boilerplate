import {IEmailOptions} from "./IEmailOptions.interface";

export interface IEmailService {
    send: (emailOptions: IEmailOptions) => Promise<any>,
    useHTMLTemplate: (data: string) => Promise<any>
}
