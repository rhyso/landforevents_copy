import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
    minLength2,
    number,
    minValue18,
    required,
    maxLength15,
    email,
    tooOld,
    alphaNumeric,
    phoneNumber} from './validators'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) =>
    <div>
        <label>
            {label}
        </label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched &&
            ((error &&
                <span className="form-error-label">
            {error}
          </span>) ||
                (warning &&
                    <span>
              {warning}
            </span>))}
        </div>
    </div>
//https://redux-form.com/7.0.3/examples/fieldlevelvalidation/


const FieldLevelValidationForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="username"
                type="text"
                component={renderField}
                label="Username"
                validate={[required, maxLength15, minLength2]}
                warn={alphaNumeric}
            />
            <Field
                name="email"
                type="email"
                component={renderField}
                label="Email"
                validate={email}
                warn={email}
            />
            <Field
                name="age"
                type="number"
                component={renderField}
                label="Age"
                validate={[required, number, minValue18]}
                warn={tooOld}
            />
            <Field
                name="phone"
                type="number"
                component={renderField}
                label="Phone number"
                validate={[required, phoneNumber]}
            />
            <div>
                <button type="submit" disabled={submitting}>
                    Submit
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear
                </button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'AddNewUser' // a unique identifier for this form
})(FieldLevelValidationForm)
