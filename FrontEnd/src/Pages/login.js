import React ,{useEffect }from "react";
import {Cookies }from 'react-cookie';
import  profile from '../images/profile.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import axios from 'axios';



export default function Login(){
  //setting cookie for username
  const myCookie = new Cookies();
  const navigate =useNavigate();
  const [userDetails,setuserDetails]=useState({username:"",pwd:""});

function  UpdateInfo(e){
    setuserDetails({...userDetails,[e.target.id]:e.target.value})
}

const[cart,setCart]=useState([])

const Verify = () => {
  
  axios({
    url: "http://localhost:3001/login",
    method: "POST",
    params: userDetails
  })
    .then((res) => {
      if (res.data.correct) {
      myCookie.set("username",res.data.username);
      const username=myCookie.get("username");

      axios({
          url:"http://localhost:3001/cart",
          method:"GET",
          params:{username}
      })
      .then((res)=>{
          setCart(res.data.list)
      })
      .catch((err)=>{
          console.log(err);
      })

      console.log(cart)
        alert("Login SuccesFull  ! :)");

        

      } else if(res.data.newMail){
        alert("Register Before Login!");
        navigate("/register");
      }
      else if (res.data.wrnpwd) {
        alert("Please Check Your Password!");
      }
    })
    .catch((err)=>{
      console.log(err);
     })
}

//saving to local storage when cart updates and navigate to home

useEffect(() => {
  if (cart.length > 0) {
    const cartItems = cart.map((item) => ({ ...item, quantity: 1 }));
    localStorage.setItem('cart', JSON.stringify(cartItems));
    navigate("/home");

  }
}, [cart]);

//to get the list of products from the database

const [productsList,setProductsList]=useState([]);
    
useEffect(()=>{
    axios({
        url: "http://localhost:3001/getproductlist",
        method: "GET"
    })
    .then((res)=>{
        setProductsList(res.data.list)
        console.log(productsList)
    })
    .catch((err)=>{
        console.log(err)
    })

},[])

localStorage.setItem('productsList',JSON.stringify(productsList))


    return (
        <div className="login">
        <div>
        <header className="header-home">
          <a href="\home" className="button">Home</a>
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
        
         <div style={{display:"flex",justifyContent:"space-around"}}>   
         <AccountCircleIcon fontSize="large"/>
         {/* <div className='input-box'><MailIcon /><input onChange={UpdateInfo} value={userDetails.email} name="email" className='input-cust' type="email" placeholder="Email Address" icon="MailIcon" /></div> */}

         <TextField id="username" onChange={UpdateInfo} aria-valuetext={userDetails.username} size="small" type="text" label="Username" variant="outlined" required/>
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
        

    </div>
         </div> 
     </div>
     </div>
    );
}