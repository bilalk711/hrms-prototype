import React from "react";

const SignUpView = ({ onSubmit, error,loading }) => {
  return (
    <div className='form-backdrop'>
    <div className='form-container'>
    <div className='form-header'>
      <h1>Sign Up</h1>
      </div>
      {loading ?
       <div className='loader'/>
       :
      <div>
      <form onSubmit={onSubmit}>
         <div className='forms'>
          <input
            name="username"
            type="text"
            placeholder="Username" className='form-controls' required
          />
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
          <input
            name="name"
            type="text"
            placeholder="Name" className='form-controls'/>
          </div>
        <input type="submit" value='Sign Up' className='form-submit'/>
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

export default SignUpView;
