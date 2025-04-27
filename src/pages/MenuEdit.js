// src/pages/MenuEdit.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../services/auth';

function MenuEdit() {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/menu/today');
      setMenuItems(res.data.menuItems);
    } catch (error) {
      setMessage('Error fetching current menu.');
    }
  };

  const addMenuItem = async () => {
    if (!newItem.trim()) return;
    try {
      const token = getToken();
      const res = await axios.post('http://localhost:3000/api/menu/add', {
        item: newItem
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Item added to today’s menu!');
      setNewItem('');
      fetchMenu();
    } catch (error) {
      setMessage('Error adding item.');
    }
  };

  const removeItem = async (itemToRemove) => {
    try {
      const token = getToken();
      const res = await axios.post('http://localhost:3000/api/menu/remove', {
        item: itemToRemove
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Item removed from menu!');
      fetchMenu();
    } catch (error) {
      setMessage('Error removing item.');
    }
  };

//   return (
//     <div>
//       <h2>Edit Today's Menu (Admin)</h2>
//       {message && <p>{message}</p>}

//       <div className="mb-3">
//         <label>New Menu Item:</label>
//         <input
//           type="text"
//           className="form-control"
//           value={newItem}
//           onChange={(e) => setNewItem(e.target.value)}
//         />
//         <button className="btn btn-success mt-2" onClick={addMenuItem}>
//           Add Item
//         </button>
//       </div>

//       <h4>Current Menu Items</h4>
//       <ul>
//         {menuItems.map((item) => (
//           <li key={item}>
//             {item}{' '}
//             <button className="btn btn-danger btn-sm" onClick={() => removeItem(item)}>
//               Remove
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
return (
  <div className="container py-4 mt-5">
    <div className="card shadow-sm p-4 mt-5">
      <h2 className="text-center text-primary mb-4">Edit Today's Menu (Admin)</h2>

      {message && (
        <div className="alert alert-info text-center" role="alert">
          {message}
        </div>
      )}

<div className="input-group mb-4">
  <input
    type="text"
    className="form-control form-control-lg"
    placeholder="Enter new menu item..."
    value={newItem}
    onChange={(e) => setNewItem(e.target.value)}
  />
  <button className="btn btn-success" type="button" onClick={addMenuItem}>
    ➕ Add
  </button>
</div>


      <h4 className="mb-3">🍽️ Current Menu Items</h4>
      <ul className="list-group border">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{item}</span>
            <button
              className="btn btn-outline-danger btn-sm ms-auto"
              onClick={() => removeItem(item)}
            >❌ Remove</button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}
export default MenuEdit;
