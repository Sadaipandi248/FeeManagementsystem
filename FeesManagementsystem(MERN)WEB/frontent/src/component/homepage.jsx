import React from 'react';
import { Link } from 'react-router-dom';
import studentImage from '../image/student_logo.png';
import adminImage from '../image/admin_logo2.png';
import background from '../image/background.jpg';
import '../component/student_component/fms.css';
import Button from 'react-bootstrap/Button';

const HomePage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '107vh', 
    display: 'flex',
    padding:'40px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  };

  return (
    <div style={backgroundStyle}>
      <h1>Fees Management System</h1>
      <div className="user-cards">
        <div className="user-card">
          <img src={studentImage} alt="Student" className="user-image" />
          <h3>Student</h3>
          <Link to="/stu_login">
            <button className='btn'>Login as student</button>
          </Link>
        </div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="user-card">
          <img src={adminImage} alt="Admin" className="user-image" />
          <h3>Admin</h3>
          <Link to="/adm_login">
            <Button className='btn'>Login as Admin</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
