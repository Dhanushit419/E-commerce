import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import user from '../images/user.png';
import pass from '../images/password.png';
import profile from '../images/profile.png';
import mobile from '../images/mobile.png';
import email from '../images/email.png';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from "axios";
import Apiurl from '../Components/Apiurl.js'
import Swal from 'sweetalert2'
import { IconButton } from "@mui/material";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from "@mui/icons-material";

export default function Register() {

  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  function validateForm() {

    if (userDetails.username === "" || userDetails.email === "" || userDetails.mobile === "" || userDetails.pwd === "" || userDetails.Confirmpassword === "" || userDetails.address === "" || userDetails.city === "") {
      Swal.fire({
        icon: 'error',
        title: 'All fields are required!',
        text: 'Please fill in all the fields.'
      });
      return false;
    }

    if (userDetails.pwd.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Password too short!',
        text: 'Password must be at least 8 characters long.'
      });
      return false;
    }
    if (!isValidEmail(userDetails.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email Address!',
        text: 'Please enter a valid email address.'
      });
      return false;
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d).*$/.test(userDetails.pwd)) {
      Swal.fire({
        icon: 'error',
        title: 'Weak password!',
        text: 'Password must contain both letters and numbers.'
      });
      return false;
    }

    if (userDetails.pwd !== userDetails.Confirmpassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password mismatch!',
        text: 'Passwords do not match. Please re-enter your password.'
      });
      return false;
    }


    return true;
  }

  useEffect(() => {
    document.title = "Register - Trendify"
  }, [])

  const navigate = useNavigate();
  const [userDetails, setuserDetails] = useState({ email: "", mobile: "", pwd: "", username: "", address: "", city: "", Confirmpassword: "" });

  function UpdateInfo(e) {
    setuserDetails({ ...userDetails, [e.target.id]: e.target.value })
  }

  const RegisterUser = () => {
    if (!validateForm()) {
      return;
    }
    else {
      axios({
        url: Apiurl + "/user/register",
        method: "POST",
        params: userDetails
      })
        .then((res) => {
          if (!res.data.mail) {
            Swal.fire({
              icon: 'error',
              title: 'Invalid Email Address!',
              text: 'Please provide a valid email address.'
            });
          }
          else if (!res.data.newUser) {
            Swal.fire({
              icon: 'warning',
              title: 'User Already Registered !',
              showDenyButton: true,
              confirmButtonText: 'Login',
              denyButtonText: 'Try again',
              confirmButtonColor: '#1565c0',
              denyButtonColor: '#1565c0'
            })
              .then((result) => {
                if (result.isConfirmed) {
                  navigate("/login");
                }
              })
          }
          else if (!res.data.uniqueUsername) {

            Swal.fire({
              icon: 'warning',
              title: 'Username Not Available !',
              text: 'Username already taken ! Please Try with different username '
            })
          }
          else if (res.data.newUser) {
            Swal.fire({
              icon: 'success',
              title: 'Registered Successfully ! ',
              text: 'Press Enter to login '
            }).then((res) => {
              if (res.isConfirmed) {
                navigate("/login")
              }
            })
          }

        })
        .catch((err) => {
          console.log(err)
        })

    }
  }
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
              <h1 style={{ padding: "0 30px" }}>Register Page</h1>
            </div>
            <br />

            <div style={{ display: "flex", justifyContent: "space-around" }}  >
              <img alt='' src={user} height={30} className='user' />
              <TextField id="username" value={userDetails.username} onChange={UpdateInfo} label="Username" size="small" type="text" variant="outlined" required />
            </div>
            <br />
            <div style={{ display: "flex", justifyContent: "space-around" }}  >
              <img alt="" src={mobile} height={30} className='user' />
              <TextField id="mobile" value={userDetails.mobile} onChange={UpdateInfo} label="Mobile Number" size="small" type="phone" variant="outlined" required />
            </div>
            <br />
            <div style={{ display: "flex", justifyContent: "space-around" }}  >
              <img alt='' src={email} height={30} className='user' />
              <TextField id="email" value={userDetails.email} onChange={UpdateInfo} label="Email" size="small" type="email" variant="outlined" required />
            </div>
            <br />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <img alt='' src={pass} height={30} />
                <TextField id="pwd" value={userDetails.pwd} onChange={UpdateInfo} size="small" type={showPassword ? "text" : "password"} label="Password" variant="outlined" required />

              </div>
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </div>

            <br />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <img alt='' src={pass} height={30} />
              <TextField id="Confirmpassword" value={userDetails.Confirmpassword} onChange={UpdateInfo} label="Confirm Password" size="small" type={showConfirmPassword ? "text" : "password"} variant="outlined" required />
              <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </div>
            <br />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <LocationOnIcon fontSize="large" />
              <TextField id="city" value={userDetails.city} onChange={UpdateInfo} label="City" size="small" type="text" variant="outlined" required />
            </div>
            <br />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <LocationCityIcon fontSize="large" />
              <TextField id="address" value={userDetails.address} onChange={UpdateInfo} label="Address" size="small" type="text" variant="outlined" required />
            </div>
            <br />
            <Button onClick={RegisterUser} variant="contained" className='submit-button' type="submit">Register</Button>         <br></br>
            <br />
            <br />
            <div className='register'><p>Already Registered ?</p><a href='/login'>Login</a></div>


          </div>
        </div>
      </div>
    </div>
  );
}