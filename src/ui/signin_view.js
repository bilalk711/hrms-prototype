import React from 'react'
import {NavLink} from 'react-router-dom'

const SignInView = ({ onSubmit,error,loading }) => {
  return (
    <div className='account-page'>
    <h3 class="account-title">DREAMTEAM MANAGEMENT</h3>
    <div className='form-backdrop login-page'>
    <div className='form-container login-page'>
    <div className='form-header'>
      <img src="./dreamteam.png" alt="logo"/>
      </div>
      <div>
      <form onSubmit={onSubmit}>
         <div className='forms'>
         <div className='form-controls-group'>
           <input
             name="email"
             type="email"
             placeholder="Email" className='form-controls login-input-controls' required
           />
          </div>
          <div className='form-controls-group'>
           <input
             name="password"
             type="password"
             placeholder="Password" className='form-controls login-input-controls' required
           />
          </div>
          <div className='error-login'>
          {error&&<span>{error}</span>}
          </div>
          <div className='form-controls-group'>
           <input type="submit" value='Log In' className='form-submit' disabled = {(loading)? "disabled" : ""}/>
          </div>
        </div>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default SignInView;
