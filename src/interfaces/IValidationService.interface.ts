import {ILoginCredentials} from "./ILoginCredentials.interface";
import {ILoginValidationResponse} from "../services/validation/ValidationService";
import {IRegisterBody} from "./IRegisterBody.interface";

interface IValidationService {
    login: (credentials: ILoginCredentials) => ILoginValidationResponse,
    register: (credentials: IRegisterBody) => ILoginValidationResponse,
    passwordReset: (data: any) => any
}

export default IValidationService
