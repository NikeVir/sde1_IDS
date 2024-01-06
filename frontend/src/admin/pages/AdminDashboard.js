import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './dashboard.css'
import DashboardTable from '../components/DashboardTable';
import FileUpload from '../components/FileUpload';
export default function AdminDashboard() {
  const [daily, setDaily] = useState(0);
  const [weekly, setWeekly] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [page, setPage] = useState(1);

  const getdata = async () => {
    try {
      let token = localStorage.getItem('admintoken');
      const res = await axios.get('http://localhost:8000/admin/api/active_count',
      {
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if(res.status==200){
      console.log(res.data);
      setDaily(res.data.dailyActiveUsersCount);
      setWeekly(res.data.weeklyActiveUsersCount);
      setMonthly(res.data.monthlyActiveUsersCount);
    }else if(response.status==401){
      window.location.replace('/admin/login')
      console.log("Unauthorized")
    }
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getdata();
  }, [])
  return (
    <div>
        <header className='navbar'>
    <div className='navbar__title navbar__item'>IDS</div>
    <div className='navbar__item' onClick={()=>setPage(1)}>Dashboard</div>
    <div className='navbar__item' onClick={()=>setPage(0)}>Excel Upload</div>
    </header>
    { page == 1? (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px'
      }}>
      <div>
        <h1>Admin Dashboard</h1>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
         
        
        }}>
          <div
           style={{
            border: '1px solid black',
            padding: '50px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '25px',
            marginRight: '10px'
           }} 
          >Daily {daily}</div>
          <div
           style={{
            border: '1px solid black',
            padding: '50px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '25px',
            marginRight: '10px'
           }} 
          >Weekly {weekly}</div>
          <div 
           style={{
            border: '1px solid black',
            padding: '50px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '25px',
            marginRight: '10px'
           }} 
          >Monthly {monthly} </div>
        </div>
      </div>

       <DashboardTable/>
    </div>
    ):(
      <FileUpload/>
    ) }

    </div>
  )
}
