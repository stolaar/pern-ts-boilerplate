import isEmpty from 'lodash.isempty'
import {IRegisterBody} from "../../interfaces/IRegisterBody.interface";

interface ILoginCredentials {
    email: string;
    password: string;
}

interface ILoginErrors {
    email?: string;
    password?: string;
}

interface IRegisterErrors {
    name?: string;
    email?: string;
    password?: string;
    password2?: string;
}

export interface ILoginValidationResponse {
    errors: ILoginErrors;
    isValid: boolean;
}

class ValidationService {
    login(credentials: ILoginCredentials): ILoginValidationResponse {
        const errors: ILoginErrors = {}
        const {email, password} = credentials

        if(isEmpty(email)) {
            errors.email = 'Email cannot be empty'
        }

        if(isEmpty(password)) {
            errors.email = 'Password cannot be empty'
        }

        return {errors, isValid: isEmpty(errors)}

    }

    register(credentials: IRegisterBody): ILoginValidationResponse {
        const errors: IRegisterErrors = {}
        const {name, email, password, password2} = credentials

        if(isEmpty(email)) {
            errors.email = 'Email cannot be empty'
        }
        if(isEmpty(password)) {
            errors.password = 'Password cannot be empty'
        }

        if(isEmpty(password2)) {
            errors.password2 = 'You must confirm your password'
        }
        if(isEmpty(name)) {
            errors.name = 'You must provide your name'
        }

        return {errors, isValid: isEmpty(errors)}

    }

    passwordReset(data: {password: string, password2: string}) {
        const errors: {password?: string, password2?: string} = {}

        if(data.password !== data.password2) errors.password2 = 'Passwords doesnt match'

        return {errors, isValid: isEmpty(errors)}
    }
}

export default ValidationService
