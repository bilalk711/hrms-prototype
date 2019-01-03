import React from 'react'
import { Field, reduxForm } from 'redux-form'

let ProjectForm = props => {
      const { handleSubmit } = props
      return (
        <form onSubmit={handleSubmit} className='forms'>
          <div>
            <Field name="title" component="input" type="text" placeholder='Project Name' required/>
          </div>
          <div>
            <Field name="employee" component="input" type="text" placeholder='Employee Name' required/>
          </div>
          <div>
            <Field name="client" component="input" type="text" placeholder='Client Name' required/>
          </div>
          <div>
            <Field name="agency" component="input" type="text" placeholder='Company/Agency Name' required/>
          </div>
          <div>
            <Field name="description" component="input" type="textarea" placeholder='Description'/>
          </div>
          <input type="submit" value='Add'/>
        </form>
      )
    }

export {ProjectForm}
