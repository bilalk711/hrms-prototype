import React from 'react'
import { Field, reduxForm } from 'redux-form'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)

let LeaveForm = props => {
      const { handleSubmit } = props
      return (
        <form onSubmit={handleSubmit}>
          <div className='forms'>
          <div className="row">
            <div className="col-25">
                <label for="reason">Reason</label>
            <Field name="reason" component={renderField} type="text" label='Reason' className='form-controls'/>
          </div>
          </div>
          <div className="row">
            <div className="col-25">
                <label for="from">From</label>
                <DayPickerInput
                     className="col-75" style={{margin:'0px',width:'100%'}} onDayChange={ props.start}/>
          </div>
          </div>
          <div className="row">
            <div className="col-25">
                <label for="to">To</label>
                <DayPickerInput
                     className="col-75" style={{margin:'0px',width:'100%'}} onDayChange={ props.end}/>
          </div>
          </div>
          <div className="row">
            <div className="col-25">
                <label for="type">Leave Type</label>
              <Field name="leaveType" component='select' type='select'>
                <option>--Select--</option>
                <option value="casual">Casual</option>
                <option value="medical">Medical Leave</option>
                <option value="pay">Loss of Pay</option>
              </Field>
              </div>
          </div>
          </div>
          <input type="submit" value='Add' className='form-submit'/>
        </form>
      )
    }


    const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
      <div>
        <input {...input} placeholder={label} type={type} className='form-controls'/>
        {
          touched && (
            (error && <span className='error'>{error}</span>) || (warning && <span>{warning}</span>)
          )
        }
      </div>
    )

function validate(formProps) {
      const errors = {};

      if (!formProps.reason) {
        errors.reason = 'Please enter the reason for your leave'
      }
      if (!formProps.leaveType) {
        errors.leaveType = 'Please select leave type'
      }
      return errors;
    }

LeaveForm = reduxForm({
  form: 'addLeave',validate
})(LeaveForm)

export {LeaveForm}
