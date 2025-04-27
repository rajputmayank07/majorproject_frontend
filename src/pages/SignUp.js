// SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { saveUserToLocalStorage } from '../services/auth';
import { useNavigate } from 'react-router-dom';
function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', rfid_tag: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', form);
      if (res.data.success) {
        // Save user & token
        saveUserToLocalStorage(res.data.user, res.data.token);
        setMessage('Registration successful!');
        // redirect to dashboard or payment
        navigate('/dashboard');
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage('Error registering user');
    }
  };

  return (
    <div className="row justify-content-center mt-5 mb-5">
      <div className="col-md-6">
        <div className="card shadow-sm p-4">
          <div className="card-body">
            <h2 className="card-title mb-4">Register</h2>
            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input name="name" className="form-control form-control-lg rounded-pill" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input name="email" type="email" className="form-control form-control-lg rounded-pill" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input name="password" type="password" className="form-control form-control-lg rounded-pill" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">RFID Tag (Optional)</label>
                <input name="rfid_tag" className="form-control form-control-lg rounded-pill" onChange={handleChange} />
              </div>
              <button className="btn btn-primary w-100 rounded-pill mt-3 shadow">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
