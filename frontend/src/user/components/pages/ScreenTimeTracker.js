import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
const ScreenTimeTracker = () => {
  const [startTime, setStartTime] = useState(null);
  const [screenTime, setScreenTime] = useState(0);
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setStartTime(Date.now());
      } else if (startTime) {
        const endTime = Date.now();
        const duration = endTime - startTime;
        setScreenTime((prevScreenTime) => prevScreenTime + duration);
        console.log('Screen Time:', screenTime);
        sendScreenTimeToBackend(duration);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [startTime]);

  const sendScreenTimeToBackend = async (duration) => {
    try {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('userId');
      console.log(id)
      const response = await axios.post(`http://localhost:8000/user/api/record`, {"screenTime":screenTime,"id":id}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status==200){
        console.log("Screen time updated")
      }else if(response.status==401){
        window.location.replace('/user/login')
        console.log("Unauthorized")
      }
    } catch (error) {
      console.error('Error sending screen time data to backend:', error);
      if(error.response.status==401){
        window.location.replace('/user/login')
        console.log("Unauthorized")
      }
    }
  };

  return (
    <div>
      <p>Screen Time: {screenTime} milliseconds</p>
    </div>
  );
};

export default ScreenTimeTracker;
