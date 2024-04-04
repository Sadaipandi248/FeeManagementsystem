import { useEffect, useState } from "react";
import axios from 'axios';
import StudentNavbar from "./stu_nav";
import './fms.css';
import { Link } from "react-router-dom";

export default function Payment() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Token not available');
      return;
    }

    axios.get('http://localhost:4000/student/getalldatapay', {
      headers: {
        'auth': token,
      },
    })
      .then((res) => {
        const userData = res.data;
        setUser(userData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Calculate the total amount
  const totalAmount = user.fees.reduce((acc, fee) => acc + fee.feeamount, 0);

  return (
    <>
     <div className="student-dashboard">
        <StudentNavbar />
        <h1>Payment page</h1>

        {user.name ? (
          <>
            <h2>Student Name: {user.name}</h2>
            <h2>Course: {user.course}</h2>

            {user.fees && user.fees.length > 0 ? (
              <div className="fees-section">
                <h2>Fees:</h2>
                <table className="fees-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Amount</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {user.fees.map((fee, index) => (
                      <tr key={index}>
                        <td>{fee.feetype}</td>
                        <td>{fee.feeamount} <Link to="/payment2" >pay</Link></td>
                     
                      </tr>
                    ))}
                    {/* Display total amount */}
                    <tr>
                      <td>Total Amount</td>
                      <td>{totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No fees available for this user.</p>
            )}
          </>
        ) : (
          <p>User data not available</p>
        )}
      </div>
    </>
  );
}
