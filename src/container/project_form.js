import React from 'react'
import { Field, reduxForm } from 'redux-form'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)

let ProjectForm = props => {
      const { handleSubmit, deadline } = props
      return (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
                <label for="title">Project Title</label>
            <Field name="title" component={renderField} type="text" label='Project Name' className='form-controls'/>
          </div>
          <div className="form-group">
                <label for="title">Project ID</label>
            <Field name="id" component={renderField} type="text" label='Project ID' className='form-controls'/>
          </div>
          <div className="form-group">
                <label for="title">Client Name</label>
            <Field name="client" component={renderField} type="text" label='Client Name' className='form-controls'/>
          </div>
          <div className="form-group">
                <label for="title">Company Name</label>
            <Field name="agency" component={renderField} type="text" label='Company/Agency Name' className='form-controls'/>
          </div>
          <div className="form-group">
                <label for="title">Deadline</label>
            <DayPickerInput
                 className="col-75" style={{margin:'0px',width:'100%'}} onDayChange={deadline}/>
          </div>
          <div className="form-group">
                <label for="title">Description</label>
            <Field name="description" component={renderField} type="textarea" label='Description' className='form-controls form-text-area'/>
          </div>
          <div className='form-btn-submit-center'>
          <input type="submit" value='Add' className='btn-primary-form'/>
          </div>
        </form>
      )
    }
    const renderDate = ({ input, label, type, meta: { touched, error, warning } }) => (
      <div>
      <DayPickerInput
           className="col-75" style={{margin:'0px',width:'100%'}}/>
        {
          touched && (
            (error && <span className='error'>{error}</span>) || (warning && <span>{warning}</span>)
          )
        }
      </div>
    )
    const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
      <div>
        <input {...input} placeholder={label} type={type} class='form-inputs'/>
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
      if (!formProps.id) {
        errors.id = 'Please enter ID of project'
      }
      if (!formProps.client) {
        errors.client = 'Please enter client name'
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
