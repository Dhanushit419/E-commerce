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



export default function login(){
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
        <form action='/login'>

         <div style={{display:"flex",justifyContent:"space-around"}}  >   
            <img alt='' src={user} height={30} className='user'/>
            <TextField id="outlined-basic" size="small" type="text" label="Fullname" variant="outlined" required/>
        </div>
        <br/>
        <div style={{display:"flex",justifyContent:"space-around"}}  >   
            <img alt="" src={mobile} height={30} className='user'/>
            <TextField id="outlined-basic"size="small" type="phone" label="Mobile Number" variant="outlined" required />
        </div>
        <br/>
        <div style={{display:"flex",justifyContent:"space-around"}}  >   
            <img alt='' src={email} height={30} className='user'/>
            <TextField id="outlined-basic"size="small" type="email" label="Email" variant="outlined" required/>
        </div>
        <br/>
        <div  style={{display:"flex",justifyContent:"space-around"}}>
            <img alt=''  src={pass} height={30} />
            <TextField id="outlined-basic"size="small" type="password" label="Password" variant="outlined" required/>
        </div>
        <br></br>
        <div  style={{display:"flex",justifyContent:"space-around"}}>
            <img alt='' src={pass} height={30} />
            <TextField id="outlined-basic"size="small" type="password" label="Confirm Password" variant="outlined"required />
        </div>
        <br />
        <Button variant="contained" className='submit-button'type="submit">Register</Button>         <br></br>
         <br />
         <br/>
         <div className='register'><p>Already Registered ?</p><a href='/login'>Login</a></div>

        </form>

    </div>
         </div> 
     </div>
     </div>
    );
}