
const required = value => (value ? undefined : 'Required')
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength8 = maxLength(8)
const maxLength15 = maxLength(15)
const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength2 = minLength(2)
const minLength6 = minLength(6)

const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value => value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined

const tooOld = value => value && value > 65 ? 'You might be too old for this' : undefined

const aol = value =>
    value && /.+@aol\.com/.test(value)
        ? 'Really? You still use AOL for your email?'
        : undefined

const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'Only alphanumeric characters'
        : undefined

const phoneNumber = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
        ? 'Invalid phone number, must be 10 digits'
        : undefined

// const testPostCode = value =>
//     value && ^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$.test(value)
//     ? 'Invalid post code or format'
//     : undefined

export {
    minLength,
    minLength2,
    number,
    minValue18,
    required,
    minValue,
    maxLength15,
    email,
    tooOld,
    aol,
    alphaNumeric,
    phoneNumber,
    minLength6,
    maxLength8,
}
