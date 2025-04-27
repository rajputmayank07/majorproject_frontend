// src/components/Navbar.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, logoutUser } from '../services/auth';
import {
  FaHome,
  FaUserPlus,
  FaSignInAlt,
  FaSignOutAlt,
  FaUtensils,
  FaUserShield
} from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const user = getUser();  // if logged in, returns { _id, name, role, meal_count }

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };
  const location = useLocation();
  const isHome = location.pathname === '/';
//   return (
//     <nav className="navbar navbar-expand-lg mb-4" style={{ backgroundColor: '#F1FAEE' }}>
//       <div className="container-fluid">
//         <Link className="navbar-brand fw-bold fs-4 " to="/">DH-93 Dining</Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav ms-auto">
//             {!user && (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/signUp">Register</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login">Login</Link>
//                 </li>
//               </>
//             )}
//             {user && (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/dashboard">Dashboard</Link>
//                 </li>
//                 {/* Show Admin link if role=admin */}
//                 {user.role === 'admin' && (
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/admin">Admin</Link>
//                   </li>
//                 )}
//                 <li className="nav-item">
//                   <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

return(
<nav className={`navbar navbar-expand-lg fixed-top ${isHome ? 'navbar-transparent' : 'navbar-solid'}`}>
      <div className="container-fluid px-4">
        <Link className={`navbar-brand fw-bold d-flex align-items-center fs-4 ${isHome ? 'text-white' : 'text-dark'}`} to="/">
          <FaHome className="me-2" />
          DH-93 Dining
        </Link>

        <div className="d-flex ms-auto gap-3">
          {!user ? (
            <>
              <Link className={`nav-link d-flex align-items-center ${isHome ? 'text-white' : 'text-dark'}`} to="/signup">
                <FaUserPlus className="me-1" /> Register
              </Link>
              <Link className={`nav-link d-flex align-items-center ${isHome ? 'text-white' : 'text-dark'}`} to="/login">
                <FaSignInAlt className="me-1" /> Login
              </Link>
            </>
          ) : (
            <>
              <Link className={`nav-link d-flex align-items-center ${isHome ? 'text-white' : 'text-dark'}`} to="/dashboard">
                <FaUtensils className="me-1" /> Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link className={`nav-link d-flex align-items-center ${isHome ? 'text-white' : 'text-dark'}`} to="/admin">
                  <FaUserShield className="me-1" /> Admin
                </Link>
              )}
              <button className={`btn btn-link nav-link d-flex align-items-center ${isHome ? 'text-white' : 'text-dark'}`} onClick={handleLogout}>
                <FaSignOutAlt className="me-1" /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;


