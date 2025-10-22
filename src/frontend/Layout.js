// Layout.js

import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSignOutAlt, FaUser, FaChalkboardTeacher, FaBars } from 'react-icons/fa';

const Layout = () => {
  const [userDropdown, setUserDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const username = localStorage.getItem("name") || "User";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    toast.info("Logout successful", { autoClose: 2000 });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-layout">
      <ToastContainer />

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Welcome {username}</div>
        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </button>

        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            <FaChalkboardTeacher className="icon" /> Dashboard
          </NavLink>

          <div className="nav-dropdown" ref={dropdownRef}>
            <button
              className="nav-link dropdown-toggle"
              onClick={() => setUserDropdown(!userDropdown)}
            >
              <FaUser className="icon" /> Expenses Info
            </button>

            <div className={`dropdown-menu ${userDropdown ? 'show' : ''}`}>
              <NavLink
                to="/userdetails"
                className={({ isActive }) =>
                  isActive ? 'dropdown-item active' : 'dropdown-item'
                }
              >
                Expenses Details
              </NavLink>
            </div>
          </div>

          <div className="nav-user">
           
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="custom-main">
        <h1 className="text-black">Expenses User Management</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;