import React, { useState } from "react";
import StudentNavbar from "./stu_nav";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

export default function Payment2() {
  const [amount, setAmount] = useState('');
  const [feetypes, setFeetypes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    function getEmailFromToken() {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.email;
      }
      return null;
    }
  
    try {
      const enteredAmount = parseFloat(amount);
  
      if (isNaN(enteredAmount) || enteredAmount < 0) {
        Swal.fire('Invalid Amount', 'Please enter a valid non-negative amount', 'error');
      } else {
        const currentuser = getEmailFromToken();
        const response = await axios.post('http://localhost:4000/student/payment', {
          email: currentuser,
          feetypes,
          amount: enteredAmount,
        }, {
          headers: {
            'auth': localStorage.getItem('authToken'),
          },
        });
  
        console.log('Payment successful:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Payment successful!',
        });
        setFeetypes('');
        setAmount('');
      }
    } catch (err) {
      console.error('Payment failed:', err.response ? err.response.status : 'Network Error', err.response ? err.response.data : 'No response from server');
      Swal.fire({
        icon: 'error',
        title: 'Payment failed!',
        text: 'Payment failed. Please try again later.',
      });
    }
  };
  
  

  return (
    <>
      <StudentNavbar />
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.heading}>Payment</h2>

          <select value={feetypes}
           onChange={(e) => setFeetypes(e.target.value)} 
           style={styles.select} required>
            <option>select</option>
            <option value="collegefees">College Fees</option>
            <option value="examfees">Exam Fees</option>
          </select>
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>Pay</button>
        </form>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '10px 10px 10px rgba(0.8, 0, 0, 0.1)',
    backgroundColor: '#fff',
    
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  select: {
    marginBottom: '10px',
    padding: '8px',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};
