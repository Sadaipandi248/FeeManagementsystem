import React, { useState } from 'react';
import './fms.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import AdminNavbar from '../Admin_component/adm_nav';

const SignupScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [registerNumber, setRegisterNumber] = useState('');
    const [course, setCourse] = useState('');
  
    const handleSignup = async (e) => {
      e.preventDefault();
      try {
        const user = await axios.post('http://localhost:4000/student/reg', {
          name,
          email,
          regnum: registerNumber,
          course,
        });
        
        console.log("Register the", user);
    
        Swal.fire({
          icon: 'success',
          title: 'Student added successfully!',
          text: `name:${name}, email:${email} `,
        });
    
        setName('');
        setEmail('');
        setRegisterNumber('');
        setCourse('');
      } catch (error) {
        console.error('Signup failed:', error);
    
        Swal.fire({
          icon: 'error',
          title: 'Signup failed!',
          text: `Error: ${error.message}`,
        });
      }
    };
    
  
    return (
      <>
   <AdminNavbar />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSignup}>
          <h2>Add student</h2>
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
            placeholder="Register Number"
            className="input-field"
            value={registerNumber}
            onChange={(e) => setRegisterNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Course"
            className="input-field"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">
            Signup
          </button>
        </form>
      </div>
      </>
    );
  };
  

export default SignupScreen;
