import React from 'react'
import {SignupForm} from '../container/signup_form'
import propTypes from 'prop-types'

export const UISignupForm = ({login,submit})=>
                 <div className='form-backdrop'>
                 <div className='form-container'>
                 <div className='form-header'>
                  <h2> Sign Up </h2>
                 </div>
                 <SignupForm onSubmit={submit}/>
                 </div>
                 </div>
