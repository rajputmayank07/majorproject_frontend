//Yeh apna APP.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';     // optional
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import MenuEdit from './pages/MenuEdit';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PurchaseSubscription from './pages/PurchaseSubscription';
// function App() {
//   return (
//     <Router>
//       <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           {/* <div className="container mt-4"> */}
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<Login />} /> {/* If using login */}
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/admin" element={<Admin />} />
//           <Route path="/admin/menu" element={<MenuEdit />} />
//           <Route path="/purchase" element={<PurchaseSubscription />} />
//           {/* </div> */}
//         </Routes>
      
//       <Footer/>
//     </Router>
//   );
// }
function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/menu" element={<MenuEdit />} />
            <Route path="/purchase" element={<PurchaseSubscription />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
