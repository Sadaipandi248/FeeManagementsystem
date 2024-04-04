// UploadPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AdminNavbar from './adm_nav';

const MySwal = withReactContent(Swal);

const UploadPage = () => {
  const nav = useNavigate();
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.xlsx, .xls' });

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post('http://localhost:4000/admin/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Display success message with SweetAlert
      MySwal.fire({
        icon: 'success',
        title: 'File Uploaded Successfully!',
        showConfirmButton: false,
        timer: 1500,
      });

      // Redirect to display data page after a short delay
      setTimeout(() => {
        nav('/stu_list');
      }, 1500);
    } catch (error) {
      console.error('Error uploading file:', error);

      // Display error message with SweetAlert
      MySwal.fire({
        icon: 'error',
        title: 'Error Uploading File',
        text: 'An error occurred while uploading the file. Please try again.',
      });
    }
  };

  return (
    <div>
      <AdminNavbar />
      <h1>Upload Excel Sheet</h1>
      <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
        <input {...getInputProps()} />
        <p>Drag & drop your Excel sheet here, or click to select one</p>
      </div>
      {file && (
        <div>
          <p>Selected file: {file.name}</p>
          <button onClick={uploadFile}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
