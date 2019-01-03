import React from 'react'
import { Field, reduxForm } from 'redux-form'


let EmployeeForm = props => {
    const { handleSubmit } = props
    return (
            <form onSubmit={handleSubmit}>
              <div className='forms'>
              <div>
                <Field name="id" component={renderField} type="text" label='Employee ID' className='form-controls'/>
              </div>
              <div>
                <Field name="name" component={renderField} type="text" label='Employee Name' className='form-controls'/>
              </div>
              <div>
                <Field name="email" component={renderField} type="text" label='Email' className='form-controls'/>
              </div>
              <div>
                <Field name="password" component={renderField} type="password" label='Password' className='form-controls'/>
              </div>
              </div>
              <input type="submit" value='Add Employee' className='form-submit'/>
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
  if(!formProps.id){
    errors.client = 'Please enter Employee ID'
  }

  if (!formProps.email) {
    errors.agency = 'Please enter the email of Employee'
  }

  if(!formProps.password) {
    errors.description = 'Please enter the password of Employee'
  }
  return errors;
}

EmployeeForm = reduxForm({
  form: 'addEmployee',validate
})(EmployeeForm)

export {EmployeeForm}
