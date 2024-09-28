import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './create.css'; // Assuming you create a CSS file

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        gender: '',
        age: ''
    });

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        axios.post('/add_user', values)
            .then((res) => {
                navigate('/home');
                console.log(res);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className='container-fluid vh-100 vw-100 d-flex align-items-center justify-content-center Create'>
            <div className='row'>
                <h3 className='text-center mb-4'>Add Student</h3>
                <div className='d-flex justify-content-end mb-3'>
                    <Link to='/' className='btn btn-success'>Home</Link>
                </div>
                <form onSubmit={handleSubmit} className='table-form'>
                    <div className='form-group row'>
                        <label htmlFor='name' className='col-sm-4 col-form-label text-right'>Name</label>
                        <div className='col-sm-8'>
                            <input type='text' className='form-control' name='name' required onChange={(e) => setValues({...values, name: e.target.value})} />
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor='email' className='col-sm-4 col-form-label text-right'>Email</label>
                        <div className='col-sm-8'>
                            <input type='email' className='form-control' name='email' required onChange={(e) => setValues({...values, email: e.target.value})} />
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor='gender' className='col-sm-4 col-form-label text-right'>Gender</label>
                        <div className='col-sm-8'>
                            <input type='text' className='form-control' name='gender' required onChange={(e) => setValues({...values, gender: e.target.value})} />
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor='age' className='col-sm-4 col-form-label text-right'>Age</label>
                        <div className='col-sm-8'>
                            <input type='number' className='form-control' name='age' required onChange={(e) => setValues({...values, age: e.target.value})} />
                        </div>
                    </div>
                    <div className='form-group row'>
                        <div className='col-sm-12 d-flex justify-content-center'>
                            <button type='submit' className='btn btn-success'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create;
