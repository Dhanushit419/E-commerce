import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import Apiurl from '../../Components/Apiurl.js'

export default function AdminLogin(){
    const myCookie=new Cookies()
    const navigate=useNavigate()

    const [userDetails,setuserDetails]=useState({id:"",pwd:""});

    function  UpdateInfo(e){
        setuserDetails({...userDetails,[e.target.id]:e.target.value})
    }

    const Verify=()=>{
        axios({
            url:Apiurl+'/admin/verifyadmin',
            method:'GET',
            params:userDetails
        })
        .then((res)=>{
            if(res.data.admin){
                myCookie.set("admin",userDetails.id);
                Swal.fire({
                    imageUrl:'https://i.ibb.co/8mG3ZG2/Whats-App-Image-2023-07-31-at-22-47-49.jpg',
                    imageHeight:'130px',
                    imageWidth:'130px',
                    title:'Welcome '+userDetails.id+' !',
                    text:'Successfully Logged in as Admin !',
                    confirmButtonText:'Go to Dashboard',
                    confirmButtonColor:'#1565c0'
                })
                .then((result)=>{
                    if(result.isConfirmed){
                        navigate('/dashboard')
                    }
                })
            }
            else{
                Swal.fire({
                    icon:'error',
                    title:'Admin Login Credentials is Wrong !',
                    text:'This is Only For Admin login.IF you are a User Go to User Login',
                    showDenyButton: true,
                    confirmButtonText:'User Login',
                    denyButtonText:'Try Again',
                    confirmButtonColor:'#1565c0',
                    denyButtonColor:'#1565c0'
                  })
                  .then((result)=>{
                    if(result.isConfirmed){
                      navigate("/login");
                    }
                  })
            }
        })
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          Verify();
        }
      }


    return (
        <div className="adminlogin">
        <div className="adminlogin-card">
            <div className="admincard-left">
            <img src="https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX9896883.jpg" style={{mixBlendMode:'multiply',height:'50vh',width:'300px'}} alt="" />
            </div>
            <div className="admincard-right">
                <TextField id="id" onChange={UpdateInfo} aria-valuetext={userDetails.id}  size="large" type="text" label="Admin ID" variant="filled" />
                <TextField id="pwd"  onChange={UpdateInfo} aria-valuetext={userDetails.pwd} onKeyDown={handleKeyPress} size="large" type="password" label="Password" variant="filled" />
            <Button variant="contained" onClick={Verify} >Login As Admin</Button>
            <p>User? <a href="/login">userlogin</a></p>
              
            </div>
        </div>
    </div>
    )

}