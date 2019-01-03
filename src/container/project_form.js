import React from 'react'
import { Field, reduxForm } from 'redux-form'


const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
  
let ProjectForm = props => {
      const { handleSubmit } = props
      return (
        <form onSubmit={handleSubmit}>
          <div className='forms'>
          <div>
            <Field name="title" component={renderField} type="text" label='Project Name' className='form-controls'/>
          </div>
          <div>
            <Field name="employee" component={renderField} type="text" label='Employee Name' className='form-controls'/>
          </div>
          <div>
            <Field name="client" component={renderField} type="text" label='Client Name' className='form-controls'/>
          </div>
          <div>
            <Field name="agency" component={renderField} type="text" label='Company/Agency Name' className='form-controls'/>
          </div>
          <div>
            <Field name="deadline" component={renderField} type="date" label='Deadline' className='form-controls'/>
          </div>
          <div>
            <Field name="description" component={renderField} type="textarea" label='Description' className='form-controls form-text-area'/>
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

      if (!formProps.title) {
        errors.title = 'Please enter title of project'
      }
      if (!formProps.employee) {
        errors.employee = 'Please enter leader employee name'
      }

      if (!formProps.client) {
        errors.client = 'Please enter client name'
      }

      if(!formProps.deadline){
        errors.client = 'Please enter deadline'
      }

      if (!formProps.agency) {
        errors.agency = 'Please enter the name of agency'
      }

      if(!formProps.description) {
        errors.description = 'Please enter minimal description'
      }
      return errors;
    }
ProjectForm = reduxForm({
  form: 'addProject',validate
})(ProjectForm)

export {ProjectForm}
