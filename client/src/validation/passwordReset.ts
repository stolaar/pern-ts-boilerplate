import isEmpty from 'lodash.isempty'
import Validator from 'validator'
import {IRegisterBody} from "../interfaces/IRegisterBody.interface";

const validatePasswordReset = (body: { password: string, password2: string }): {isValid: boolean; errors: { password: string, password2: string }} => {
    const errors: IRegisterBody | any = {}

    if(isEmpty(body.password)) errors.password = 'Please enter password'
    else if(!Validator.equals(body.password, body.password2)) errors.password2 = 'Passwords doesn\'t match'

    return {isValid: isEmpty(errors), errors}
}

export default validatePasswordReset
