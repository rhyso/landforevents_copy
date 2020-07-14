import React, { PureComponent } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { Field } from 'redux-form';
//https://codesandbox.io/s/53v8178q4n

class DatePicker extends PureComponent {

  state = {
    focused: false,
  };

  onFocusChange = value => {
    this.setState({ focused: !this.state.focused });
    const { input } = this.props;
    input.onFocus(value);
  };

  render() {
    const {
      input,
      meta: { touched, error, warning },
      placeholder,
      label,
      disabled,
      required,
    } = this.props;
    const { focused } = this.state;
    const invalid = error !== undefined && error !== null;

    return (
      <React.Fragment>
        <SingleDatePicker
          showClearDate={true}
          displayFormat="YYYY-MM-DD"
          numberOfMonths={1}
          disabled={disabled}
          placeholder={placeholder}
          date={input.value}
          onDateChange={input.onChange}
          focused={focused}
          onFocusChange={this.onFocusChange}
          id={input.name}
        />
        {error && touched && <span>{error}</span>}
      </React.Fragment>
    );
  }
}

export const formatDates = value => (value ? moment(value) : null);

export const normalizeDates = value =>
  value ? value.format('YYYY-MM-DD') : null;

export const FieldDatePicker = props => {
  return (
    <Field
      normalize={normalizeDates}
      format={formatDates}
      name={props.name}
      component={DatePicker}
      props={props}
    />
  );
};

export default DatePicker;
