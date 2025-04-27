// src/pages/Admin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../services/auth';
import { Link } from 'react-router-dom';
function Admin() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = getToken();
      const res = await axios.get('http://localhost:3000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.users);
    } catch (error) {
      setMessage('Error fetching users (only admin can do this).');
    }
  };

  return (
<div className="row justify-content-center mt-5">
  <div className="col-md-10 mt-5">
    <div className="card shadow-sm p-4">
      <h2>Admin Panel</h2>
      {message && <p className="text-danger">{message}</p>}
      <h3>Registered Users</h3>
      <table className="table table-striped table-hover table-bordered rounded">
        <thead className="table-primary text-white">
          <tr><th>Name</th><th>Email</th><th>Meal Count</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.meal_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="text-center mt-4">
  <Link to="/admin/menu" className="btn btn-primary rounded-pill px-4">Edit Today’s Menu</Link>
</div>

  </div>
</div>
  );
}

export default Admin;
