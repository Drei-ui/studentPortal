import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import Validation from './Validation'; 
import './LoginSignup.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [loginValues, setLoginValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState([]);
  const navigate = useNavigate();

  // Handle input change
  const handleInput = (e) => {
    setLoginValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  //const err = Validation(loginValues, isLogin ? 'login' : 'signup');
  // Handle form submission for both Login and Signup
  const handleSubmit = (e) => {
    e.preventDefault();
    const err = Validation(loginValues, isLogin ? 'login' : 'signup');
    setErrors(err);

    if (isLogin) {
        // Login Logic
        if (!err.email && !err.password) {
            axios.post('http://localhost:5000/login', {
                email: loginValues.email,
                password: loginValues.password
            })
            .then(res => {
                // Assuming the response structure is consistent
                if (res.data.errors) {
                    setBackendError(res.data.errors);
                } else {
                    setBackendError([]);
                    if (res.data.message === "Success") {
                        navigate('/home');
                    } else {
                        alert("Invalid login credentials");     
                    }
                }
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setBackendError([{ msg: "An error occurred during login." }]);
            });
        }
    } else {
        // Signup Logic
        if (!err.name && !err.email && !err.password) {
            axios.post('http://localhost:5000/signup', {
                name: loginValues.name,    // Send name for signup
                email: loginValues.email,   // Send email for signup
                password: loginValues.password // Send password for signup
            })
            .then(res => {
                if (res.data && res.data.message) {
                    alert(res.data.message); // Show a success message
                    navigate('/'); // Redirect to login or home on successful signup
                } else {
                    // Handle unexpected server response
                    setBackendError(res.data.errors || [{ msg: "Something went wrong." }]);
                }
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setBackendError([{ msg: "An error occurred while signing up." }]);
            });
        }
    }
};


  return (
    <div className="outer-container">
      <div className="container">
        <div className="Header">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        </div>

        {backendError.length > 0 && backendError.map((e, index) => (
          <p key={index} className='text-danger'>{e.msg}</p>
        ))}

        <form onSubmit={handleSubmit} className="details">
          {/* Only show name input if in Signup mode */}
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={loginValues.name}
                onChange={handleInput}
                className="form-control"
              />
              {errors.name && <span className='text-danger'>{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={loginValues.email}
              onChange={handleInput}
              className="form-control"
            />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={loginValues.password}
              onChange={handleInput}
              className="form-control"
            />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>

          <div className="buttons">
            <button type="submit" className="btn btn-dark">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>

          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
