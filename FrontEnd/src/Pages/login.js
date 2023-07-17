import React from "react";
import  profile from '../images/profile.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';



export default function Login(){

  const navigate =useNavigate();
  const [userDetails,setuserDetails]=useState({email:"",pwd:""});

function  UpdateInfo(e){
    setuserDetails({...userDetails,[e.target.id]:e.target.value})
}

  const Verify =()=>{
    
    axios({
      url:"http://localhost:3001/login",
      method:"POST",
      params:userDetails
    }).then((res)=>{
      if(res.correct ===true ){
        navigate("/");
      }
      else if(res.wrnpwd ===true){
        alert("Please Check Your Password")
      }
      else if(res.newMail===true){
        alert("Register Before Login ! ");
        navigate("/register")
      }
    })

    
  }
    return (
        <div className="login">
        <div>
        <header className="header-home">
          <a href="\" className="button">Home</a>
          <a href='\about' className="button">About</a>
          <a href="\register" className="button">Register</a>
        </header>
      </div>
        <div className="main">
        
        <div className="submain">
        <div>
        <div className="imgs">
          <div className="container-image">
            <img alt=''  src={profile} height={100}></img>
          </div>

        </div>
        <div>
            <h1 style={{padding:" 20px"}}>Login Page</h1>
        </div>
        <br/>
        <form >
         <div style={{display:"flex",justifyContent:"space-around"}}>   
         <AccountCircleIcon fontSize="large"/>
         {/* <div className='input-box'><MailIcon /><input onChange={UpdateInfo} value={userDetails.email} name="email" className='input-cust' type="email" placeholder="Email Address" icon="MailIcon" /></div> */}

         <TextField id="email" onChange={UpdateInfo} aria-valuetext={userDetails.email} size="small" type="email" label="E-mail" variant="outlined" required/>
        </div>
        <br></br>
        <br></br>
        <div  style={{display:"flex",justifyContent:"space-around"}}>
            <PasswordIcon fontSize="large"/>
            {/* <div className='input-box'><LockIcon /><input onChange={UpdateInfo} value={userDetails.pwd} name="pwd" className='input-cust' type="password" placeholder="Password" icon="Lock"/></div> */}

            <TextField id="pwd" onChange={UpdateInfo} aria-valuetext={userDetails.pwd} size="small" type="password" label="Password" variant="outlined" required/>
        </div>
        <br></br>
         <Button variant="contained" className='submit-button' type="submit" onClick={Verify}>Log in</Button> 
         <br></br><br></br><br></br>
         
         <div className='register'><p>No account? </p><a href='/register'>Register</a></div>
        </form>

    </div>
         </div> 
     </div>
     </div>
    );
}