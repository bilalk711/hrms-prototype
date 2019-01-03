import React from 'react'
import { Field, reduxForm } from 'redux-form'

const required = value => value ? undefined : 'Required'
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined

let ChangeEmployeeCredentials = props => {
    const { handleSubmit } = props
    return (
            <form onSubmit={handleSubmit}>
              <div className='forms'>
              <div>
                <Field name="email" component={renderField} validate={email} type="text" label='Employee Email' className='form-controls'/>
              </div>
              <div>
                <Field name="name" component={renderField} type="text" label='Employee Name' className='form-controls'/>
              </div>
              <div>
                <Field name="password" component={renderField} type="password" label='Employee Password' className='form-controls'/>
              </div>
              </div>
              <input type="submit" value='Change Credentials' className='form-submit'/>
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
  const errors = {}

  if(!formProps.name){
    errors.name = 'Please enter Employee Name'
  }
  if (!formProps.email) {
    errors.email = 'Please enter the new email of Employee'
  }
  if(!formProps.password) {
    errors.password = 'Please enter the new password of Employee'
  }
  return errors;
}

ChangeEmployeeCredentials = reduxForm({
  form: 'changeCredentials',validate
})(ChangeEmployeeCredentials)

export {ChangeEmployeeCredentials}
