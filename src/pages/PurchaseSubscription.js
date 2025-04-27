// src/pages/PurchaseSubscription.js
import React, { useState } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

function PurchaseSubscription() {
  const navigate = useNavigate();
  const [planType, setPlanType] = useState('single');
  const [message, setMessage] = useState('');

  // Utility to load the Razorpay script
  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const startPayment = async () => {
    try {
      // Load the Razorpay checkout script
      const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        setMessage('Razorpay SDK failed to load.');
        return;
      }

      // Create order from our backend
      const token = getToken();
      const orderRes = await axios.post('http://localhost:3000/api/payment/order',
        { planType },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      if (!orderRes.data.success) {
        setMessage('Failed to create order. Please try again.');
        return;
      }

      const { order } = orderRes.data; // order.id, order.amount, etc.
      const user = getUser();

      // Razorpay checkout options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_xxxx', 
        amount: order.amount,
        currency: 'INR',
        name: 'DH-93 Dining',
        description: 'Meal Subscription Purchase',
        order_id: order.id,
        handler: async function (response) {
          // Payment success
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);

          // Now finalize subscription purchase
          await axios.post('http://localhost:3000/api/user/purchase',
            { planType },
            { headers: { Authorization: `Bearer ${token}` }}
          );
          setMessage('Subscription updated successfully!');
          // redirect back to Dashboard
          navigate('/dashboard');
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      setMessage('Error in payment.');
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6 mt-5">
        <div className="card p-3">
          <h2>Purchase Subscription</h2>
          <p>Select a plan:</p>
          <select
            className="form-select form-select-lg rounded-pill mb-2"
            value={planType}
            onChange={(e) => setPlanType(e.target.value)}
          >
            <option value="single">Single Meal (60 Rs)</option>
            <option value="monthly">Monthly (1500 Rs)</option>
          </select>
          <button onClick={startPayment} className="btn btn-primary w-100 mt-3 rounded-pill shadow">
            Pay Now
          </button>
          {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default PurchaseSubscription;
