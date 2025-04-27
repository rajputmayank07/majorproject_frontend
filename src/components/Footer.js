// import React from 'react';
// import { Link } from 'react-router-dom';

// function Footer() {
//   return (
//     <footer className="bg-light text-center text-muted py-4 mt-5 border-top">
//       <div className="container">
//         <p className="mb-1 fw-bold">DH-93 Dining © {new Date().getFullYear()}</p>
//         <div className="mb-2">
//           <Link to="/" className="text-muted mx-2 text-decoration-none">Home</Link>
//           <Link to="/dashboard" className="text-muted mx-2 text-decoration-none">Dashboard</Link>
//           <Link to="/admin" className="text-muted mx-2 text-decoration-none">Admin</Link>
//           <Link to="/login" className="text-muted mx-2 text-decoration-none">Login</Link>
//         </div>
//         <small>Made with ❤️ by Mayank | Powered by RFID tech</small>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserShield, FaSignInAlt, FaUtensils } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-light border-top mt-5 py-4">
      <div className="container text-center">
        <p className="mb-2 fw-semibold text-primary">DH-93 Dining © {new Date().getFullYear()}</p>

        <div className="mb-2 small">
          <Link to="/" className="text-muted mx-2 text-decoration-none">
            <FaHome className="me-1 mb-1" /> Home
          </Link>
          <Link to="/dashboard" className="text-muted mx-2 text-decoration-none">
            <FaUtensils className="me-1 mb-1" /> Dashboard
          </Link>
          <Link to="/admin" className="text-muted mx-2 text-decoration-none">
            <FaUserShield className="me-1 mb-1" /> Admin
          </Link>
          <Link to="/login" className="text-muted mx-2 text-decoration-none">
            <FaSignInAlt className="me-1 mb-1" /> Login
          </Link>
        </div>

        <small className="text-muted">Built with ❤️ by Mayank | RFID-powered dining automation</small>
      </div>
    </footer>
  );
}

export default Footer;
