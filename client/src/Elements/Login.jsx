import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Only for signup
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle Login Submission
  const handleLogin = (e) => {
    e.preventDefault();
    // Mock authentication (replace with real API call)
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('auth', 'true');
      navigate('/home'); // Redirect to home after login
    } else {
      alert('Invalid login credentials');
    }
  };

  // Handle Signup Submission
  const handleSignup = (e) => {
    e.preventDefault();
    // Mock signup (replace with real API call)
    if (username && password && email) {
      alert('Account created successfully!');
      setIsLogin(true); // Switch back to login after successful signup
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div className='container'>
      <div className='Header'>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      </div>
      <div className="details">
        <form onSubmit={isLogin ? handleLogin : handleSignup}>
          <div className="form-group">
            <input
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <input
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="buttons">
            <button type='submit' className='btn btn-dark'>
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>

        {/* Toggle between Login and Sign Up */}
        <p>
          {isLogin
            ? "Don't have an account? "
            : 'Already have an account? '}
          <button
            className="btn btn-link"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
