import React, { useState } from 'react';
import '../student_component/fms.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Adminsignup = () => {
    const nav = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [staffID, setStaffID] = useState('');
  
    const handleSignup = async (e) => {
      e.preventDefault();
      try {
      const user =  await axios.post('http://localhost:4000/admin/adminreg', {
          name,
          email,
          staffID: staffID,
        });
        console.log("Register the",user);
        // Redirect to the dashboard after successful signup
        nav('/adm_login');
      } catch (error) {
        console.error('Signup failed:', error);
      }
    };
  
    return (
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSignup}>
          <h2>Admin Signup</h2>
          <input
            type="text"
            placeholder="Name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="StaffID"
            className="input-field"
            value={staffID}
            onChange={(e) => setStaffID(e.target.value)}
            required
          />
   
          <button type="submit" className="submit-button">
            Signup
          </button>
        </form>
      </div>
    );
  };
  

export default Adminsignup;
