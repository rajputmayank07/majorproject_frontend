// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { saveUserToLocalStorage } from '../services/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e)=> {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', form);
      if (res.data.success) {
        saveUserToLocalStorage(res.data.user, res.data.token);
        navigate('/dashboard');
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div className="row justify-content-center mt-5 mb-5">
      <div className="col-md-6">
        <div className="card shadow-sm p-4">
          <div className="card-body">
            <h2>Login</h2>
            {message && <div className="alert alert-danger">{message}</div>}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label" >Email</label>
                <input name="email" type="email" className="form-control form-control-lg rounded-pill" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input name="password" type="password" className="form-control form-control-lg rounded-pill" onChange={handleChange} required />
              </div>
              <button className="btn btn-primary w-100 rounded-pill mt-3 shadow">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
