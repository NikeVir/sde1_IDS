// LoginForm.js
import React, { useEffect, useState } from 'react';
import "./user.css"
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

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

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history  = useNavigate();


  useEffect(() => {
    let token = localStorage.getItem('token');
    const verify = async(token) => {
      const response = await axios.get(`http://localhost:8000/user/api/tokenverify`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      if(response.data.message != "Unauthorized"){
        history('/user/dashboard');
      }
    }
    verify(token)
  
  }, []);
  const handleSubmit = async(e) => {
    e.preventDefault();
    const device = detectDeviceType();
    try {
      const response = await axios.post('http://localhost:8000/user/api/login', {
        email,
        password,
        device,
      });
      console.log(response.data.user)
      if(response.data.token){ 
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        console.log('Login successful!');
        history('/user/dashboard');
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
      <h1>User Login</h1>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <button type="submit">Login</button>
      <h4>If you are not registered. <Link to="/user/register">Register</Link></h4>
      
    </form>
    </div>
  );
};

export default UserLogin;
