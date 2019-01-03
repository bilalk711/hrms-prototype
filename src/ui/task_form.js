import React from 'react'
import { Field, reduxForm } from 'redux-form'

let TaskForm = props => {
      const { handleSubmit } = props
      return (
        <form onSubmit={handleSubmit}>
          <div className='forms'>
          <div className='form-controls'>
            <Field name="title" component="input" type="text" placeholder='Task Name' required/>
          </div>
          <div className='form-controls'>
            <Field name="description" component="input" type="textarea" placeholder='Description'/>
          </div>
          </div>
          <input type="submit" value='Add Task' className='form-submit'/>
        </form>
      )
    }

export {TaskForm}
