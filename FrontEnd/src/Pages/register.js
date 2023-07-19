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



export default function Register(){


    const navigate =useNavigate();
    const [userDetails,setuserDetails]=useState({name:"",email:"",mobile:"",pwd:""});
  
  function  UpdateInfo(e){
      setuserDetails({...userDetails,[e.target.id]:e.target.value})
  }

  const RegisterUser = () =>{
    axios({
        url:"http://localhost:3001/register",
        method:"POST",
        params:userDetails
    })
    .then((res)=>{
        if(res.data.newUser){
            alert("User Registered Successfully ! Please Login to continue :)")
            navigate("/login")
        }
        else{
            alert("Email Already Registered! Try with Different Email or Login to Continue :)")

        }
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  
    return (
        <div className="login">
    <header className='header-home'>
      <a href="\" className="button">Home </a>
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
            <TextField id="name" value={userDetails.name} onChange={UpdateInfo} label="Fullname" size="small" type="text"  variant="outlined" required/>
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
        <br></br>
        <div  style={{display:"flex",justifyContent:"space-around"}}>
            <img alt='' src={pass} height={30} />
            <TextField id="confirm-pwd" label="Confirm Password" size="small" type="password"  variant="outlined"required />
        </div>
        <br />
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