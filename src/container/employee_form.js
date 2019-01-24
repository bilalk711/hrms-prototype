import React from 'react'
import { Field, reduxForm } from 'redux-form'


let EmployeeForm = props => {
    const { handleSubmit } = props
    return (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                    <label for="title">Employee ID</label>
                <Field name="id" component={renderField} type="text" label='Employee ID' className='form-controls'/>
              </div>
              <div className="form-group">
                    <label for="title">Employee Name</label>
                <Field name="name" component={renderField} type="text" label='Employee Name' className='form-controls'/>
              </div>
              <div className="form-group">
                    <label for="title">Employee Email</label>
                <Field name="email" component={renderField} type="text" label='Email' className='form-controls'/>
              </div>
              <div className="form-group">
                    <label for="title">Employee Password</label>
                <Field name="password" component={renderField} type="password" label='Password' className='form-controls'/>
              </div>
              <div className='form-btn-submit-center'>
              <input type="submit" value='Add Employee' className='btn-primary-form'/>
              </div>
            </form>
    )
}
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <input {...input} placeholder={label} type={type} className='form-inputs'/>
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
