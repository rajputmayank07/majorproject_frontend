// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser, getToken } from '../services/auth';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [mealCount, setMealCount] = useState(0);
  const [todaysMenu, setTodaysMenu] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getMealCount();
    getTodaysMenu();
  }, []);

  const getMealCount = async () => {
    try {
      const user = getUser();
      if (!user) {
        setMessage('No user logged in');
        return;
      }
      const token = getToken();
      const response = await axios.get(`http://localhost:3000/api/user/meal-count?userId=${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setMealCount(response.data.meal_count);
      } else {
        setMessage('Error retrieving meal count');
      }
    } catch (error) {
      setMessage('Error fetching meal count.');
    }
  };

  const getTodaysMenu = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/menu/today');
      setTodaysMenu(res.data.menuItems);
    } catch (error) {
      setMessage('Error fetching menu.');
    }
  };


return (
  <div className="row justify-content-center mt-5">
    <div className="col-md-8 mt-5">
      <div className="card shadow-sm p-4 mb-5">
        <h2 className="mb-3">Dashboard</h2>
        {message && <p className="text-danger">{message}</p>}
        <p className="fs-5 "><strong>Your remaining meals:</strong> <span className="badge bg-success fs-6">{mealCount}</span>
        </p>
        <Link to="/purchase" className="btn btn-success mb-3 rounded-pill mb-3 px-4">
         Purchase Subscription
        </Link>

        <h3 className="mb-3">Today's Menu</h3>
        <ul className="list-group mb-2">
          {todaysMenu.map((item, index) => (
            <li key={index} className="list-group-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

}

export default Dashboard;
