import React from 'react'
import { Field, reduxForm } from 'redux-form'


let SigninForm = props => {
      const { handleSubmit } = props
      return (
        <form onSubmit={handleSubmit} className='forms'>
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

SigninForm = reduxForm({
  form: 'signIn'
})(SigninForm)

export {SigninForm}
