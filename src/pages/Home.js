// // Home.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Home() {
//   return (
//     <div>
//       {/* Hero Section */}
//       <div
//   className="hero-section d-flex flex-column justify-content-center align-items-center text-white text-center"
//   style={{
//     backgroundImage: `url('/hero-image.jpg')`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     height: '60vh',
//     position: 'relative',
//   }}
// >
//   <div
//     style={{
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(0,0,0,0.55)',
//       zIndex: 1,
//     }}
//   ></div>

//   <div style={{ zIndex: 2 }}>
//     <h1 className="display-4 fw-bold">Welcome to DH-93 Dining</h1>
//     <p className="lead">Experience hassle-free meals with our RFID-based subscription service.</p>
//     <Link to="/signup" className="btn btn-primary btn-lg mt-3 shadow rounded-pill">Get Started</Link>
//   </div>
// </div>


//       {/* Additional Content (Optional) */}
//       <div className="container mt-5">
//         <h2 className=" text-center mb-4">Why choose DH-93 Dining?</h2>
//         <div className="row">
//           <div className="col-md-4">
//             <div className="card p-4 mb-4 text-center hover-card shadow-sm">
//               <h4>No Queues</h4>
//               <p>Our RFID-based system streamlines your dining process. Scan, grab your meal, and go!</p>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card p-4 mb-4 text-center hover-card shadow-sm">
//               <h4>Flexible Plans</h4>
//               <p>Choose from single-meal or monthly subscriptions at affordable rates. Try out today!</p>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card p-4 mb-4 text-center hover-card shadow-sm">
//               <h4>Easy Management</h4>
//               <p>Track your remaining meals & update your plan any time via our user-friendly dashboard.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaQrcode, FaRegCalendarAlt, FaChartBar } from 'react-icons/fa';
import { FaChevronDown } from "react-icons/fa";
import { getUser } from '../services/auth';

function Home() {
  const user=getUser();
  return (
    <div>
      {/* Hero Section */}
      <div
        className="d-flex flex-column justify-content-center align-items-center text-white text-center"
        style={{
          backgroundImage: `url('/hero-image.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100vw',
          position: 'relative',
          overflow: 'hidden',
          margin: 0,
        }}
      >
        <div
          style={{
            background: 'linear-gradient(to bottom right, rgba(29,53,87,0.6), rgba(69,123,157,0.6))',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 1,
          }}
        ></div>

        <div style={{ zIndex: 2 }}>
          <h1 className="display-4 fw-bold">Welcome to DH-93 Dining</h1>
          <p className="lead">Smart Dining, Powered by RFID — No queues. Just scan and eat.</p>
          {!user && (<Link to="/signup" className="btn btn-primary btn-lg mt-3 shadow rounded-pill">
            Get Started
          </Link>)}
        </div>

        <div className="position-absolute bottom-0 pb-3" style={{ zIndex: 2, animation: "bounce 2s infinite" }}>
          <FaChevronDown size={22} />
        </div>
      </div>
      {/* Features Section */}
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4">Why choose DH-93 Dining?</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card p-4 mb-4 text-center shadow-sm hover-card">
              <FaQrcode size={30} className="mb-2 text-primary" />
              <h4>No Queues</h4>
              <p>Our RFID-based system streamlines your dining process. Scan, grab your meal, and go!</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 mb-4 text-center shadow-sm hover-card">
              <FaRegCalendarAlt size={30} className="mb-2 text-primary" />
              <h4>Flexible Plans</h4>
              <p>Choose from single-meal or monthly subscriptions at affordable rates. Try it today!</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 mb-4 text-center shadow-sm hover-card">
              <FaChartBar size={30} className="mb-2 text-primary" />
              <h4>Easy Management</h4>
              <p>Track your meals & update plans any time via our user-friendly dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
