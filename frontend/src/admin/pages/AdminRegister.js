// RegistrationForm.js
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./auth.css"
const detectDeviceType = () => {
  const userAgent = navigator.userAgent;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    return 'mobile';
  } else if (/iPad/i.test(userAgent)) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

const AdminRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const device = detectDeviceType();
    try {
      const response = await axios.post('http://localhost:8000/admin/api/register', {
        name,
        email,
        password,
      });
      console.log(response.data)
      if(response.data){ 
        console.log('Login successful!');
        navigate('/admin/login');
      }
      else{
        alert(response.data);
      }

      
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='Main'>

    
    <form className="form" onSubmit={handleSubmit}>
      <h1>Admin Register</h1>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <button type="submit">Register</button>
      <h4>if you are already registered.  <Link to="/admin/login">Login</Link></h4>
    </form>
    </div>
  );
};

export default AdminRegister;
