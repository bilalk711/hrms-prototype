import React from 'react'
import { Field, reduxForm } from 'redux-form'


let EditForm = props => {
      const { handleSubmit } = props
      return (
        <form onSubmit={handleSubmit} className='forms'>
          <div>
            <Field name="title" component="input" type="text" placeholder='Project Name' className='form-controls'/>
          </div>
          <div>
            <Field name="employee" component="input" type="text" placeholder='Employee Name' className='form-controls'/>
          </div>
          <div>
            <Field name="client" component="input" type="text" placeholder='Client Name' className='form-controls'/>
          </div>
          <div>
            <Field name="agency" component="input" type="text" placeholder='Company/Agency Name' className='form-controls'/>
          </div>
          <div>
            <Field name="description" component="input" type="textarea" placeholder='Description' className='form-controls'/>
          </div>
          <input type="submit" value='Change Info'/>
        </form>
      )
    }

EditForm = reduxForm({
  form: 'editProject'
})(EditForm)

export {EditForm}
