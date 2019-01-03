import React from 'react'
import { Field, reduxForm } from 'redux-form'

let TaskForm = props => {
      const { handleSubmit } = props
      return (
        <form onSubmit={handleSubmit}>
          <div className='forms'>
          <div>
            <Field name="name" label='Task Name' component={renderField} type="text" placeholder='Task Name'/>
          </div>
          <div>
            <Field name="description" label='Description' component={renderField} type="text" placeholder='Description'/>
          </div>
          </div>
          <input type="submit" value='Add Task'/>
        </form>
      )
    }
    const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
      <div>
        <input {...input} placeholder={label} type={type} className='form-controls'/>
        {
          touched && (
            error ? <span className='error'>{error}</span> : <span className='error'></span>
          )
        }
      </div>
    )
function validate(formProps) {
      const errors = {};
      if (!formProps.name) {
        errors.name = 'Please enter the task name'
      }

      if (!formProps.description) {
        errors.description = 'Please enter minimal description'
      }
      return errors;
    }

TaskForm = reduxForm({
      form: 'addTask',validate
})(TaskForm)

export {TaskForm}
