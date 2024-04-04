// AdminNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';

// This page admin navigation
const AdminNavbar = () => {
  const navStyle = {
    background: 'linear-gradient(to right, #020024, #79095c, #cca5f0)',
    padding: '20px',
  };

  const ulStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 5,
    display: 'flex',
    justifyContent: 'center',
  };

  const liStyle = {
    marginRight: '20px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: 'bold',
    padding: '29px',
    borderRadius: '5px',
  };

  // const linkHoverStyle = {
  //   backgroundColor: '#2980b9',
  //   padding: '50px'
    
  // };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}><Link to="/" style={linkStyle}>Home</Link></li>
        <li style={liStyle}><Link to="/adm_dashboard" style={linkStyle}>Dashboard</Link></li>
        <li style={liStyle}><Link to="/stu_list" style={linkStyle}>Student List</Link></li>
        <li style={liStyle}><Link to="/stu_signup" style={linkStyle}>Add Student</Link></li>
        <li style={liStyle}><Link to="/addfees" style={linkStyle}>Add Fee</Link></li>
        <li style={liStyle}><Link to="/uploadpage" style={linkStyle}>Uploadpage</Link></li>
        <li style={liStyle}><Link to="/" style={linkStyle} >Logout</Link></li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
