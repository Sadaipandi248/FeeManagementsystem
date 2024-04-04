import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  const navStyle = {
    backgroundColor: '#3498db',
    padding: '15px',
  };

  const ulStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
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
    padding: '10px',
    borderRadius: '5px',
  };

  const linkHoverStyle = {
    backgroundColor: '#2980b9',
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}><Link to="/adm_dashboard" style={linkStyle}>Dashboard</Link></li>
        <li style={liStyle}><Link to="/student_list" style={linkStyle}>Student List</Link></li>
        <li style={liStyle}><Link to="/student_history" style={linkStyle}>Student History</Link></li>
        <li style={liStyle}><Link to="/add_student" style={linkStyle}>Add Student</Link></li>
        <li style={liStyle}><Link to="/logout" style={linkStyle} onMouseOver={e => e.target.style = linkHoverStyle} onMouseOut={e => e.target.style = linkStyle}>Logout</Link></li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
