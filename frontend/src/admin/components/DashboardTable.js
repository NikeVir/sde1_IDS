import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function DashboardTable() {
    const [user, setUser] = useState([]);
    const [countryFilter, setCountryFilter] = useState('');
    const [deviceFilter, setDeviceFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getuser();
    }, [countryFilter, deviceFilter, genderFilter])
    const getuser = async () => {
        try {
            let token = localStorage.getItem('admintoken');
            const res = await axios.get('http://localhost:8000/admin/api/top-users', {
                params: {
                    country: countryFilter,
                    gender: genderFilter,
                    device: deviceFilter
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  }
            });
            if(res.status==200){
                console.log(res.data.topUsers);
                setUser(res.data.topUsers);
                setLoading(true);
              }else if(response.status==401){
                window.location.replace('/admin/login')
                console.log("Unauthorized")
              }
          
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="container">
            <div 
                style={{
                    margin: '30px 0',
                }}
            >
                <label>
                    Country:
                    <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                        <option value="India">India</option>
                        <option value="China">China</option>
                        <option value="Russia">Russia</option>
                        <option value="UK">UK</option>
                    </select>
                </label>

                <label>
                    Gender:
                    <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">other</option>
                    </select>
                </label>
                <label>
                    Device:
                    <select value={deviceFilter} onChange={(e) => setDeviceFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="mobile">mobile</option>
                        <option value="desktop">desktop</option>
                        <option value="tablet">tablet</option>
                    </select>
                </label>
            </div>

            <table className="rwd-table">
                <tbody>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Country</th>
                        <th>Duration</th>
                        <th>Device</th>
                    </tr>
                    {loading ? user.map((item, key) => (
                        <tr key={key}>
                            <td data-th="Supplier Code">

                                {item.user.name}
                            </td>
                            <td data-th="Supplier Name">
                                {item.user.email}
                            </td>
                            <td data-th="Invoice Number">
                                {item.user.gender}
                            </td>
                            <td data-th="Invoice Date">
                                {item.user.country}
                            </td>
                            <td data-th="Due Date">
                                {item.duration}
                            </td>
                            <td data-th="Due Date">
                                {item.user.device}
                            </td>

                        </tr>
                    )) : <div>loading...</div>}

                </tbody>
            </table>
        </div>

    )
}
