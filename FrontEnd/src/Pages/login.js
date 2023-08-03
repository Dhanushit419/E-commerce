import React, { useEffect } from "react";
import { Cookies } from 'react-cookie';
import profile from '../images/profile.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import axios from 'axios';
import Apiurl from '../Components/Apiurl.js'
import LoginIcon from '@mui/icons-material/Login';
import Swal from 'sweetalert2'
import LockIcon from '@mui/icons-material/Lock';
import Loading from "../Components/loading";

export default function Login() {
  //setting cookie for username
  const myCookie = new Cookies();
  const navigate = useNavigate();
  const [userDetails, setuserDetails] = useState({ username: "", pwd: "" });

  function UpdateInfo(e) {
    setuserDetails({ ...userDetails, [e.target.id]: e.target.value })
  }

  const [cart, setCart] = useState([])
  const [fetch, setFetch] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      Verify();
    }
  }


  const Verify = () => {

    axios({
      url: Apiurl+"/user/login",
      method: "POST",
      params: userDetails
    })
      .then((res) => {
        if (res.data.correct) {
          myCookie.set("username", res.data.username);
          const username = myCookie.get("username");

          axios({
            url: Apiurl+"/cart/cart",
            method: "GET",
            params: { username }
          })
            .then((res) => {
              setCart(res.data.list)
              setFetch(true)

            })
            .catch((err) => {
              console.log(err);
            })

          console.log(cart)

          Swal.fire({
            icon: 'success',
            title: 'Login sucesful'
          }).then((res) => {
            if (res.isConfirmed) {
              navigate("/home");
            }
          })

        } else if (res.data.newMail) {

          Swal.fire({
            icon: 'warning',
            title: 'User Not Registered !',
            showDenyButton: true,
            confirmButtonText: 'Try Again',
            denyButtonText: 'Register',
            confirmButtonColor: '#1565c0',
            denyButtonColor: '#1565c0'
          })
            .then((result) => {
              if (result.isDenied) {
                navigate("/register");
              }
            })

        }
        else if (res.data.wrnpwd) {

          Swal.fire({
            icon: 'warning',
            title: 'Wrong Password !',
            confirmButtonText: 'Try Again !'

          })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //saving to local storage when cart updates and navigate to home

  useEffect(() => {
    if (fetch) {
      const cartItems = cart.map((item) => ({ ...item, quantity: 1 }));
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cart]);

  //to get the list of products from the database

  const [productsList, setProductsList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //to get the list of products
    axios({
      url: Apiurl+"/products/getproductlist",
      method: "GET"
    })
      .then((res) => {
        setProductsList(res.data.list)
        console.log(productsList)
      })
      .catch((err) => {
        console.log(err)
      })

    //to get the review list

    axios({
      url: Apiurl+'/others/getreviews',
      method: 'GET'
    })
      .then((res) => {
        setLoading(false)
        setReviews(res.data.list)
      })
      .catch((err) => {
        console.log(err)
      })

  }, [])
  console.log(productsList)
  localStorage.setItem('productsList', JSON.stringify(productsList))
  localStorage.setItem('reviews', JSON.stringify(reviews))



  return (
    <div className="login">
      {loading ? <Loading text="Fetching Data From Database..." /> :
        <div>
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
                    <img alt='' src={profile} height={100}></img>
                  </div>

                </div>
                <div>
                  <h1 style={{ padding: " 20px" }}>Login Page</h1>
                </div>
                <br />

                <div style={{ display: "flex", justifyContent: "space-around" }}>
                  <AccountCircleIcon fontSize="large" />
                  {/* <div className='input-box'><MailIcon /><input onChange={UpdateInfo} value={userDetails.email} name="email" className='input-cust' type="email" placeholder="Email Address" icon="MailIcon" /></div> */}

                  <TextField id="username" onChange={UpdateInfo} aria-valuetext={userDetails.username} size="small" type="text" label="Username" variant="outlined" required />
                </div>
                <br></br>
                <br></br>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                  <LockIcon fontSize="large" />
                  {/* <div className='input-box'><LockIcon /><input onChange={UpdateInfo} value={userDetails.pwd} name="pwd" className='input-cust' type="password" placeholder="Password" icon="Lock"/></div> */}

                  <TextField id="pwd" onChange={UpdateInfo} aria-valuetext={userDetails.pwd} onKeyDown={handleKeyPress} size="small" type="password" label="Password" variant="outlined" required />
                </div>
                <br></br>
                <Button variant="contained" className='submit-button' type="submit" onClick={Verify}><span>Login</span> <LoginIcon fontSize="very-small" /></Button>
                <br></br><br></br><br></br>

                <div className='register'><p>No account? </p><a href='/register'> Register</a></div><br /><br />
                <div className='register'><p>Admin? </p><a href='/adminlogin'>Adminlogin</a></div>


              </div>
            </div>
          </div>
        </div>}
    </div>
  );
}