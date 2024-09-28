import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
  return (
    <div className='container'>
      <div className='Header'>
        <h2>Sign Up</h2>
      </div>
      <form >
        <div className="form-group">
            <input type="text" placeholder='username' />
        </div>
      </form>
      <form >
        <div className="form-group">
            <input type="email" placeholder='email' />
        </div>
      </form>
      <form >
        <div className="form-group">
            <input type="password" placeholder='password' />
        </div>
      </form>
      <button type='submit' className='btn btn-dark'>Sign up</button>
    </div>
  )
}

export default Login
