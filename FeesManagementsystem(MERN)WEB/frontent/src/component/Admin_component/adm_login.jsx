import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../student_component/fms.css'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Adminlogin = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [staffID, setStaffID] = useState('');
  const [showstaffID, setShowstaffID] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/admin/adminlogin', {
        email: email,
        staffID: staffID,
      });
  
      localStorage.setItem('authToken', response.data.token);
  
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome to the Admin Dashboard.',
      });
  
      nav('/adm_dashboard');
      console.log('Token:', response.data.token);
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Login failed!',
        text: 'Please check your credentials and try again.',
      });
    }
  };
  

  const togglestaffIDVisibility = () => {
    setShowstaffID((prev) => !prev);
  };

  const eyeStyle = {
    cursor: "pointer",
    position: "absolute",
    right: "10px",
    top: "42%",
    transform: "translateY(-50%)",
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className="form-header">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />

          <div className="password-input" style={{ position: 'relative' }}>
            <input
              type={showstaffID ? 'text' : 'password'}
              placeholder="staffID"
              value={staffID}
              onChange={(e) => setStaffID(e.target.value)}
              className="input-field"
              required
            />
            <span
              style={eyeStyle}
              onClick={togglestaffIDVisibility}
            >
              {showstaffID ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't have an account?{' '}
          <Link to="/adm_signup" className="signup-text">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Adminlogin;
