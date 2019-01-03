import React from 'react'
import { Field, reduxForm } from 'redux-form'


let SignupForm = props => {
      const { handleSubmit } = props
      return (
        <form onSubmit={handleSubmit} className='forms'>
          <div>
            <Field name="name" component="input" type="text" placeholder='Name' className='form-controls'/>
          </div>
          <div>
            <Field name="username" component="input" type="text" placeholder='Username' className='form-controls'/>
          </div>
          <div>
            <Field name="email" component="input" type="email" placeholder='Email' className='form-controls'/>
          </div>
          <div>
            <Field name="password" component="input" type="password" placeholder='Password' className='form-controls'/>
          </div>
          <input type="submit" value='Log in'/>
        </form>
      )
    }

SignupForm = reduxForm({
  form: 'signUp'
})(SignupForm)

export {SignupForm}
