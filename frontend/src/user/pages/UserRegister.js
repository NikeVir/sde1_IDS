// RegistrationForm.js
import React, { useState } from 'react';
import "./user.css"
import { Link ,useNavigate} from 'react-router-dom';
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


const UserRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    const device = detectDeviceType();
    try {
      const response = await axios.post('http://localhost:8000/user/api/register', {
        name,
        email,
        password,
        gender,
        country,
        device
      });
      console.log(response.data)
      if(response.data.user){ 
        console.log('Login successful!');
        navigate('/user/login');
      }
      else{
        alert(response.data.message);
      }

      
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='Main'>
    <form className="form" onSubmit={handleSubmit}>
      <h1>User Registration</h1>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <label>Gender:</label>
      <select value={gender} onChange={(e) => setGender(e.target.value)} required>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label>Country:</label>
      <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />


      <button type="submit">Register</button>
      <h4>If you are already registered. <Link to="/user/login">Login</Link></h4>

    </form>
    </div>
  );
};

export default UserRegister;
