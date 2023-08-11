import axios from "axios";
import React, { useEffect, useState } from "react";
import Apiurl from '../../Components/Apiurl.js'
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import Loading from "../../Components/loading.js";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Tabledata = (props) => {

    return (
        <tr className="widthincrease">
            <td>{props.index+1}</td>
            <td>{props.i.username}</td>
            <td>{props.i.email}</td>
            <td>{props.i.mobile_num}</td>
            <td>{props.i.city}</td>
            <td>{props.i.address}</td>
            <td>{props.i.count}</td>

        </tr>
    )
}

export default function Dashboard() {
    const navigate = useNavigate()
    const myCookie = new Cookies

    const [list, setList] = useState([]);
    useEffect(() => {
        axios({
            url: Apiurl + '/admin/userlist',
            method: "GET"
        })
            .then((res) => {
                setList(res.data.list);
                setLoading(false)
                console.log('user list');
            })
    }, [])

    const Logout = () => {
        myCookie.remove('admin')
        navigate('/adminlogin')
    }

    const [loading,setLoading]=useState(true);

    return (
        <div className='plmain'>
            <div className='plmain2'>
                <Button variant="contained" onClick={() => { navigate("/dashboard") }}>Dashboard</Button>
                <Button variant="contained" onClick={Logout}>Logout</Button>
            </div>
            <br></br>
            <br></br>
            <div className="plmain3">
                <h2>LIST OF USERS</h2>
                <br></br>

            </div>
            <br></br>
{ loading?<Loading text="Fetching userlist"/>:      <div>
        <div className="plmain4">
                <p>No of registered users : {list.length}</p>
            </div>
            <br></br>
            <br></br>
            <div id='pltable'>
                <table className="table">
                    <tbody>

                        <tr className="columnname">
                            <td>S.No</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Mobile</td>
                            <td>City</td>
                            <td>Address</td>
                            <td>ProductsPurchased</td>
                        </tr>
                        <div></div>
                        {list.map((i,index) => {


                            return (
                                <Tabledata i={i} index={index}/>
                            )
                        })}


                    </tbody>

                </table>

            </div>
        </div>}

            <br></br>
            <div className="chart" >
                <LineChart width={1000} height={400} data={list}>
                    <XAxis dataKey="username" />
                    <YAxis />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Tooltip />
                    <Legend />

                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
            </div>
        </div>
    );
};