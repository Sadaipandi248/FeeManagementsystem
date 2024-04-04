import React, { useState } from "react";
import axios from 'axios';
import AdminNavbar from "./adm_nav";

import "../student_component/fms.css"; 

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [selectdata, setSelectdata] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/admin/getByCourse/${selectdata}`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const feetypesum = students.reduce((accumulator, student) => {
    student.fees.forEach((fee) => {
      accumulator[fee.feetype] = (accumulator[fee.feetype] || 0) + fee.feeamount;
    });
    return accumulator;
  }, {});

  return (
    <>
      <AdminNavbar />
      <div className="student-list-container">
        <h2>Students in {selectdata}</h2>
        <select onChange={(e) => setSelectdata(e.target.value)}>
          <option value="">Select</option>
          <option value="MCA">MCA</option>
          <option value="BCA">BCA</option>
        </select>
        <button onClick={() => fetchData()}>Fetch Students</button>

        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Fee Type</th>
              <th>Fee Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(feetypesum).map((feetype, index) => (
              <tr key={index}>
                <td></td>
                <td></td>
                <td>{feetype}</td>
                <td>{feetypesum[feetype]}</td>
              </tr>
            ))}
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <ul>
                    {student.fees.map((fee, index) => (
                      <li key={index}>{fee.feetype}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {student.fees.map((fee, index) => (
                      <li key={index}>{fee.feeamount}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
