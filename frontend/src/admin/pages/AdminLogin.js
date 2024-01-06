// RegistrationForm.js
import React, { useEffect, useState } from 'react';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem('admintoken');
    const verify = async(token) => {
      const response = await axios.get(`http://localhost:8000/user/api/tokenverify`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      if(response.data.message != "Unauthorized"){
        history('/admin/dashboard');
      }
    }
    verify(token)
  
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const device = detectDeviceType();
    try {
      const response = await axios.post('http://localhost:8000/admin/api/login', {
        email,
        password,
        device,
      });
      console.log(response.data.user)
      if(response.data.token){ 
        localStorage.setItem('admintoken', response.data.token);
        console.log('Login successful!');
        navigate('/admin/dashboard');
      }
      else{
        alert(response.data.message);
      }
     
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className='Main'>
    <form className="form" onSubmit={handleSubmit}>
      <h1>Admin Register</h1>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <button type="submit">Login</button>
      <h4>if you are not registered.  <Link to="/admin/register">Register</Link></h4>

    </form>
    </div>
  );
};

export default AdminRegister;
