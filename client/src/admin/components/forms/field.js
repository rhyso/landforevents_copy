import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { minLength2,required,maxLength15,minLength6,maxLength8,alphaNumeric} from './validators'
import DatePicker, { FieldDatePicker, formatDates, normalizeDates,} from './form-components/date-picker';
import renderField from './form-components/render-field'
import FieldUsages from './form-components/field-usages'
import UploadImage from './form-components/upload-image'

//https://redux-form.com/7.0.3/examples/fieldlevelvalidation/


const FieldLevelValidationForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="fieldName"
                type="text"
                component={renderField}
                label="Name of Field"
                validate={[required, maxLength15, minLength2]}
                warn={alphaNumeric}
            />
            <Field
                name="location"
                type="text"
                component={renderField}
                label="Location"
                validate={[required, maxLength8, minLength6]}
            />
            <label className="datePickerLabel">Available From</label>
            <FieldDatePicker 
                name="dateStart" 
                placeholder="Start Date" 
                label="Start Date"
            /><br/>
            <label className="datePickerLabel">Available to</label>
            <Field
                name={'dateEnd'}
                component={DatePicker}
                placeholder="End Date"
                label="End Date"
                parse={normalizeDates}
                format={formatDates}
            /><br/><br/>
            {/* TODO add an unavilable date https://redux-form.com/8.2.2/examples/react-widgets/ */}
            <h4 className="fieldTypeLabel"> Field Usage Type</h4>
            <div className="fieldUsages">
                <FieldUsages />
            </div>


            <Field
                name="fieldSize"
                type="number"
                component={renderField}
                label="Size of field (Acres)"
                validate={[required]}
                warn={alphaNumeric}
            />

            <Field
                name="fieldCapacity"
                type="number"
                component={renderField}
                label="Capacity of field "
                validate={[required]}
                warn={alphaNumeric}
                value="test"
            />

            <Field
                name="fieldImage"
                type="text"
                component={UploadImage}
                validate={[required]}
                warn={alphaNumeric}
                defaultValue={"testing"}
            />


            {/* //need to add amenitites */}


            <div className="cta-buttons">
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
    form: 'AddNewField' // a unique identifier for this form
})(FieldLevelValidationForm)
