import React,{useEffect} from 'react'
import "./user.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ScreenTimeTracker from '../components/pages/ScreenTimeTracker'
export default function UserDashboard() {
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
      if(response.data.message == "Unauthorized"){
        history('/user/login');
      }
    }
    verify(token)
  
  }, []);
  return (
    <div>
      <ScreenTimeTracker />
      <h2>User Dashboard</h2>
    </div>
  )
}
