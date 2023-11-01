// src/Table.js
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Apiurl from '../../Components/Apiurl'

const Table = () => {
const [list,setList]=useState([]);
    useEffect(()=>{
        axios({
            url: Apiurl + "/others/complaintview",
            method:"POST"
        })
        .then((res)=>{
            console.log(res.data.list)
            setList(res.data.list)
        })
    },[])


  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Complaint</th>
        </tr>
      </thead>
      <tbody>
        {list.map((row) => (
          <tr key={row.username}>
            <td>{row.username}</td>
            <td>{row.fb}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function App() {
  return (
    <div className="App">
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>User Complaints</h1>
      <br />
      <br />
      <Table />
    </div>
  );
}

export default App;
