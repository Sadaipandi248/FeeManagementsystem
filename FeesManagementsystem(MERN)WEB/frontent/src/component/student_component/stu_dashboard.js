import { useEffect, useState } from "react";
import axios from 'axios';
import StudentNavbar from "./stu_nav";
import './fms.css';

export default function Studentdashboard() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Token not available');
      return;
    }

    axios.get('http://localhost:4000/student/getAlldata', {
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

  console.log(user.fees);

  if (loading) {
    return <div>Loading...</div>;
  }

    // Create an object to store the sum of feeamount for each feetype
    const feetypeSum = user.fees.reduce((acc, fee) => {
      acc[fee.feetype] = (acc[fee.feetype] || 0) + fee.feeamount;
      return acc;
    }, {});
  
  return (
    <>
     <div className="student-dashboard">
        <StudentNavbar />
        {user.name ? (
          <>
            <h1>Hi! {user.name}</h1>
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
                    {/* Display aggregated results in a table */}
                    {Object.keys(feetypeSum).map((feetype, index) => (
                      <tr key={index}>
                        <td>{feetype}</td>
                        <td>{feetypeSum[feetype]}</td>
                      </tr>
                    ))}
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

