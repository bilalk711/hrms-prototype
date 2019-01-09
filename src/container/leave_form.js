import React from 'react'
import { Field, reduxForm } from 'redux-form'


const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)

let LeaveForm = props => {
      const { handleSubmit } = props
      return (
        <form onSubmit={handleSubmit}>
          <div className='forms'>
          <div>
            <Field name="reason" component={renderField} type="text" label='Reason' className='form-controls'/>
          </div>
          <div>
            <Field name="from" component={renderField} type="date" label='From' className='form-controls'/>
          </div>
          <div>
            <Field name="to" component={renderField} type="date" label='To' className='form-controls'/>
          </div>
          <div>
              <Field name="leaveType" component='select' type='select'>
                <option>--Select--</option>
                <option value="casual">Casual</option>
                <option value="serious">Serious</option>
                <option value="important">Important</option>
              </Field>
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
      if (!formProps.to) {
        errors.to = 'Please enter the ending date of your leave'
      }
      if (!formProps.from) {
        errors.from = 'Please enter the starting date of your leave'
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
