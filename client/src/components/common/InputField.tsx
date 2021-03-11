import React from 'react'

export interface InputFieldProps {
    type?: string;
    name?: string;
    onChange: (e?: any) => void,
    value?: string;
    placeholder?: string;
    error?: string;
    autoComplete?: string;
    minDate?: Date;
    defaultValue?: string;
}

function InputField(props: InputFieldProps) {
    return <div  className="form-group">
        <input {...props} />
        {props.error ? <small className='invalid'>{props.error}</small> : null}
    </div>
}

export default InputField
