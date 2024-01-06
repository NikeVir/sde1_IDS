import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
const FileUpload = () => {

  const [users, setUsers] = useState([]);

  const handleFileUpload = async(event) => {
    try{
        const file = event.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const userdata = XLSX.utils.sheet_to_json(sheet, { header: ['name', 'email', 'country', 'gender','device'] });
        setUsers(userdata);
        
    }
    catch(error){
      console.log(error);
    }
  };
  const printHello = async() => {
    try{
        let token = localStorage.getItem('admintoken');
        console.log('Parsed Users:', users);
        const res = await axios.post('http://localhost:8000/admin/api/upload', users,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              }
        });
        if(res.status==200){
            console.log(res.data);
          }else if(response.status==401){
            window.location.replace('/admin/login')
            console.log("Unauthorized")
          }
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div>
      <h2>Excel Upload</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <button type="button" value="Upload"  onClick={printHello}>upload</button>
    </div>
  );
};

export default FileUpload;
