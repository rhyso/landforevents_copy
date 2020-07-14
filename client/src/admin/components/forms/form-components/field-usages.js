import React, { Fragment } from 'react';
import renderField from './render-field'
import { Field } from 'redux-form'

const FieldUsages = () => (
    <Fragment>
        <Field
            name="wedding"
            label='Wedding'
            id="wedding"
            component={renderField}
            type="checkbox"
        />

    <Field
            name="marquee"
            label='Marquee'
            id="marquee"
            component={renderField}
            type="checkbox"
        />

    <Field
            name="camping"
            label='Camping'
            id="camping"
            component={renderField}
            type="checkbox"
        />
    </Fragment>
)

export default FieldUsages