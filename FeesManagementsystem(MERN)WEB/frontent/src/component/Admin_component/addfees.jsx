import React, { useState } from "react";
import axios from 'axios';
import AdminNavbar from "./adm_nav";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../student_component/fms.css';

export default function AddFees() {
  const [department, setDepartment] = useState("");
  const [feeAmount, setFeeAmount] = useState("");
  const [feetype, setFeetype] = useState("");

  const addFees = async () => {
    try {
      const parsedFeeAmount = parseFloat(feeAmount);

      if (isNaN(parsedFeeAmount) || parsedFeeAmount <= 0) {
        Swal.fire('Invalid Amount', 'Please enter a valid non-negative amount', 'error');
      } else {
        const confirmation = await Swal.fire({
          title: 'Confirm',
          text: `Do you want to add fees in ${department}?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Save',
          cancelButtonText: 'Cancel',
        });

        if (confirmation.isConfirmed) {
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString();

          const response = await axios.post("http://localhost:4000/admin/addfee", {
            department,
            feetype,
            feeamount: parsedFeeAmount,
            date: formattedDate,
          });

          console.log(response.data);

          Swal.fire({
            icon: 'success',
            title: 'Fees added successfully!',
            text: `Fees added successfully in ${department}`,
          });

          setDepartment('');
          setFeetype('');
          setFeeAmount('');
        } else {
          Swal.fire('Cancelled', 'No fees were added.', 'info');
        }
      }
    } catch (error) {
      console.error('Error adding fees:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error adding fees!',
        text: `Error: ${error.message}`,
      });
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="add-fees-container">
        <h3>Add Fees</h3>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)} required>
            <option>select department</option>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="feetype">Fee Type</label>
          <select id="feetype" onChange={(e) => setFeetype(e.target.value)} required>
            <option>select feetype</option>
            <option value="examfees">Exam Fees</option>
            <option value="collegefees">College Fees</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="feeAmount">Fee Amount</label>
          <input
            type="number"
            id="feeAmount"
            placeholder="Enter the amount"
            value={feeAmount}
            onChange={(e) => setFeeAmount(e.target.value)}
            required
          />
        </div>

        <button className="submit-button" onClick={addFees}>Add Fees</button>
      </div>
    </>
  );
}
