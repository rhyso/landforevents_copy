import React from 'react';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
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
)

export default renderField

//https://redux-form.com/7.0.3/examples/fieldlevelvalidation/
