import isEmpty from 'lodash.isempty'
import Validator from 'validator'
import {IRegisterBody} from "../interfaces/IRegisterBody.interface";

const validateRegisterBody = (body: IRegisterBody): {isValid: boolean; errors: IRegisterBody} => {
    const errors: IRegisterBody | any = {}

    if(isEmpty(body.email)) errors.email = 'Please enter email address'
    else if(!Validator.isEmail(body.email)) errors.email = 'Please enter valid email address'

    if(isEmpty(body.name)) errors.name = 'Please enter your name'
    if(isEmpty(body.password)) errors.password = 'Please enter password'

    if(isEmpty(body.password2)) errors.password2 = 'Please confirm your password'
    else if(!Validator.equals(body.password, body.password2)) errors.password2 = 'Passwords doesn\'t match '

    if(isEmpty(body.instagram_username)) errors.instagram_username = 'Please enter your instagram username'

    if(isEmpty(body.city)) errors.city = 'Please enter city'
    if(isEmpty(body.address)) errors.address = 'Please enter your address'
    if(isEmpty(body.postal_code)) errors.postal_code = 'Please enter postal code'
    if(isEmpty(body.phone)) errors.phone = 'Please enter phone number'

    else if(!new RegExp(/^[0-9 ]+$/igm).test(body.phone)) errors.phone = 'Please enter valid phone number'

    return {isValid: isEmpty(errors), errors}
}

export default validateRegisterBody
