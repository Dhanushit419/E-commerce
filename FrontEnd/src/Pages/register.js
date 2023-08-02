import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import user from '../images/user.png';
import pass from '../images/password.png';
import  profile from '../images/profile.png';
import mobile from '../images/mobile.png';
import email from '../images/email.png';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from "axios";
import Swal from 'sweetalert2'
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Register(){


    const navigate =useNavigate();
    const [userDetails,setuserDetails]=useState({email:"",mobile:"",pwd:"",username:"",address:"",city:""});
  
  function  UpdateInfo(e){
      setuserDetails({...userDetails,[e.target.id]:e.target.value})
  }

  const RegisterUser = () =>{
    axios({
        url:"http://localhost:3001/user/register",
        method:"POST",
        params:userDetails
    })
    .then((res)=>{
        if(!res.data.newUser){
            Swal.fire({
                icon:'warning',
                title:'User Already Registered !',
                showDenyButton: true,
                confirmButtonText:'Login',
                denyButtonText:'Try again',
                confirmButtonColor:'#1565c0',
                denyButtonColor:'#1565c0'
              })
              .then((result)=>{
                if(result.isConfirmed){
                  navigate("/login");
                }
              })
        }
        else if(!res.data.uniqueUsername){

            Swal.fire({
                icon:'warning',
                title:'Username Not Available !',
                text:'Username already taken ! Please Try with different username '
              })
        }
        else if(res.data.newUser){
            Swal.fire({
                icon:'success',
                title:'Registered Successfully ! ',
                text:'Press Enter to login '
              }).then((res)=>{
                if(res.isConfirmed){
                    navigate("/login")
                }
              })
        }

    })
    .catch((err)=>{
        console.log(err)
    })

  }
  
    return (
        <div className="login">
    <header className='header-home'>
      <a href="\home" className="button">Home </a>
          <a href='\about' className="button">About</a>
          <a href="\login" className="button">Login</a>
      </header>
        <div className="main">
        
        <div className="submain">
        <div>
        <div className="imgs">
          <div className="container-image">
            <img alt='' src={profile} height={100}></img>
          </div>

        </div>
        <div>
            <h1 style={{padding:"0 30px"}}>Register Page</h1>
        </div>
        <br/>

        <div style={{display:"flex",justifyContent:"space-around"}}  >   
            <img alt='' src={user} height={30} className='user'/>
            <TextField id="username" value={userDetails.username} onChange={UpdateInfo} label="Username" size="small" type="text"  variant="outlined" required/>
        </div>
        <br/>
        <div style={{display:"flex",justifyContent:"space-around"}}  >   
            <img alt="" src={mobile} height={30} className='user'/>
            <TextField id="mobile" value={userDetails.mobile} onChange={UpdateInfo} label="Mobile Number" size="small" type="phone"  variant="outlined" required />
        </div>
        <br/>
        <div style={{display:"flex",justifyContent:"space-around"}}  >   
            <img alt='' src={email} height={30} className='user'/>
            <TextField id="email" value={userDetails.email} onChange={UpdateInfo} label="Email" size="small" type="email"  variant="outlined" required/>
        </div>
        <br/>
        <div  style={{display:"flex",justifyContent:"space-around"}}>
            <img alt=''  src={pass} height={30} />
            <TextField id="pwd" value={userDetails.pwd} onChange={UpdateInfo} size="small" type="password" label="Password" variant="outlined" required/>
        </div>
        <br/>
        <div  style={{display:"flex",justifyContent:"space-around"}}>
            <img alt='' src={pass} height={30} />
            <TextField id="confirm-pwd" label="Confirm Password" size="small" type="password"  variant="outlined"required />
        </div>
        <br />
        <div  style={{display:"flex",justifyContent:"space-around"}}>
            <LocationOnIcon fontSize="large" />
            <TextField id="city" value={userDetails.city} onChange={UpdateInfo} label="City" size="small" type="text"  variant="outlined"required />
        </div>
        <br />
        <div  style={{display:"flex",justifyContent:"space-around"}}>
            <LocationCityIcon fontSize="large"/>
            <TextField id="address" value={userDetails.address} onChange={UpdateInfo} label="Address" size="small" type="text"  variant="outlined" required />
        </div>
        <br/>
        <Button onClick={RegisterUser} variant="contained" className='submit-button' type="submit">Register</Button>         <br></br>
         <br />
         <br/>
         <div className='register'><p>Already Registered ?</p><a href='/login'>Login</a></div>


    </div>
         </div> 
     </div>
     </div>
    );
}