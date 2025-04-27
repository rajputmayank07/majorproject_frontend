import React, { useState } from 'react';
import axios from 'axios';

function SubscriptionPurchase() {
  const [planType, setPlanType] = useState('single');
  const [message, setMessage] = useState('');

  // Utility to load the Razorpay checkout script
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
    setMessage('');

    // 1. Load the Razorpay checkout script
    const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      setMessage('Razorpay SDK failed to load.');
      return;
    }

    try {
      // 2. Create order from our backend
      // (If your backend requires auth, pass token in headers)
      // e.g. { headers: { Authorization: `Bearer ${tokenFromLocalStorage}` } }
      const orderRes = await axios.post('http://localhost:3000/api/payment/order', { planType });
      if (!orderRes.data.success) {
        setMessage('Failed to create order. Please try again.');
        return;
      }

      const { order } = orderRes.data; // contains order.id, amount, etc.

      // 3. Retrieve your user ID from localStorage
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setMessage('User ID not found. Please log in or register first.');
        return;
      }

      // 4. Set up Razorpay checkout options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxx',
        amount: order.amount,
        currency: 'INR',
        name: 'DH-93 Dining',
        description: 'Meal Subscription',
        order_id: order.id,
        handler: async function (response) {
          // Payment success
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);

          // 5. Now finalize the purchase on the backend
          await axios.post('http://localhost:3000/api/user/purchase', {
            userId,     // If your backend still requires userId in the body
            planType
          });
          setMessage('Subscription updated!');
        },
        theme: {
          color: '#3399cc'
        }
      };

      // 6. Open the Razorpay popup
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      setMessage('Error in payment process.');
    }
  };

  return (
    <div>
      <h3>Choose Subscription</h3>
      {message && <div style={{ color: 'red' }}>{message}</div>}

      <select onChange={(e) => setPlanType(e.target.value)} value={planType}>
        <option value="single">Single Meal (60 Rs)</option>
        <option value="monthly">Monthly (1500 Rs)</option>
      </select>
      <button onClick={startPayment}>Pay Now</button>
    </div>
  );
}

export default SubscriptionPurchase;
