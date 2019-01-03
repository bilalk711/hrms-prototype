import React from 'react'
import {SigninForm} from '../container/signin_form'
import propTypes from 'prop-types'

export const UISigninForm = ({failedAttempt,submit})=>
                 <div class='form-backdrop'>
                 <div class='form-container'>
                 <div className='form-header'>
                  <h2> Sign in </h2>
                  <h4>Don't have an Account?</h4>
                  {failedAttempt&&<h5> Email or Password not valid </h5>}
                 </div>
                 <SigninForm onSubmit={submit}/>
                 </div>
                 </div>
