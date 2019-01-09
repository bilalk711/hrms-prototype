import React from 'react'
import {NavLink} from 'react-router-dom'

const SignInView = ({ onSubmit,error,loading }) => {
  return (
    <div className='form-backdrop'>
    <div className='form-container'>
    <div className='form-header'>
      <h1>Sign In</h1>
      </div>
      {loading ?
       <div className='loader'/>
       :
      <div>
      <form onSubmit={onSubmit}>
         <div className='forms'>
          <input
            name="email"
            type="email"
            placeholder="Email" className='form-controls' required
          />
          <input
            name="password"
            type="password"
            placeholder="Password" className='form-controls' required
          />
          </div>
        <input type="submit" value='Log In' className='form-submit'/>
      </form>
    <div className='error'>
    {error&&<span>{error}</span>}
    </div>
    </div>
  }
    </div>
    </div>
  );
};

export default SignInView;
