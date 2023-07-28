// import React from "react";
// import { Cookies } from "react-cookie";
// import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Head from '../Components/profileHeader';
// import BadgeIcon from '@mui/icons-material/Badge';
// import EmailIcon from '@mui/icons-material/Email';
// import PersonIcon from '@mui/icons-material/Person';
// import SmartphoneIcon from '@mui/icons-material/Smartphone';
// import BusinessIcon from '@mui/icons-material/Business';

// export default function Userpro(){
 

//   const navigate = useNavigate();
//   const myCookie = new Cookies();
//   const username=myCookie.get("username");

//   return(
//       <div className="profile-main">
//         <Head/>
//         <div className="profile-main1">

//         <div className="profile-card1">
//             <img src="https://i.ibb.co/TMmLqCh/Trendify.jpg" style={{height:'100px',width:'100px',backgroundColor:'transparent',borderRadius:'50px',	backgroundColor:"#96d110",
// 	boxShadow:'0 0 20px 6px rgba(0, 0, 0, 0.2)'}} alt="" />

//             <p className="flex-item"><PersonIcon/><span>Username</span><span>:</span><span>{username} </span></p>
//             <p className="flex-item"><EmailIcon/><span>Email</span><span>:</span><span>nantha@gmail.com</span></p>
//             <p className="flex-item"><SmartphoneIcon/><span><span>Mobile </span><span>:</span><span>nantha@gmail.com</span></span></p>
//             <p className="flex-item"><BusinessIcon/><span><span>Address </span><span>:</span><span>nantha@gmail.com</span></span></p>
//         </div>

//         <div className="profile-card2">

//         </div>

//         </div>

//       </div>
//   );
// };




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Typography, Box, Grid, Paper, TextField, Divider } from '@material-ui/core';
import { Button } from '@mui/material';
import { Email, Phone, LocationOn, Home, PinDrop, PermIdentity, Fingerprint, AccountBalance } from '@material-ui/icons';
import { Stack } from '@mui/material';
import Axios from "axios";

const data = {
  name: "Yuvaraj Vetrivel",
  aadhaarno: "123456789000",
  phoneno: "9129942399",
  addline1: "78/9 Nehru Street",
  addline2: "West Tambaram",
  city: "Tambaram",
  district: "Chennai",
  state: "Tamilnadu",
  pincode: "600000",
  email: "yuviexample@gmail.com",
};

// const useStyles = makeStyles((theme) => ({
//   avatar: {
//     width: theme.spacing(20),
//     height: theme.spacing(20),
//     marginBottom: theme.spacing(2),
//     boxShadow: "0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)"
//   }
// }))

function ProfilePage({ name, email, phoneNumber, line1, line2, district, homeAddress, city, state, pincode, aadharNumber, profilePicture }) {
  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement({ pageLanguage: 'en', layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT }, 'google_translate_element')
  // }

  // const fullAnotherSpeak = (text) => {
  //   responsiveVoice.speak(text, "Tamil Male");
  // }

  // useEffect(() => {
  //   var addScript = document.createElement('script');
  //   addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
  //   document.body.appendChild(addScript);
  //   window.googleTranslateElementInit = googleTranslateElementInit;
  // }, []);

  // useEffect(() => {
  //   var addScript = document.createElement('script');
  //   addScript.setAttribute('src', 'https://code.responsivevoice.org/responsivevoice.js?key=EKCH0zej');
  //   document.body.appendChild(addScript);
  // }, []);

  // const classes = useStyles();
  const navigate = useNavigate();
 
  return (
    
    <div className='backProfile' style={{
      height: "max-content"
    }} id="google_translate_element">
      <div className='profileBox' style={{
        width: "70%",
      }}>
        <Stack direction={"column"} spacing={1}
          sx={{
            display: "flex", alignItems: "center", justifyContent: "center", position: "relative", bottom: "7%"
          }}
        >
          <Stack direction={"row"}
            sx={{
              display: "flex", alignItems: "center", justifyContent: "space-around", width: "90%",padding:"3%"
            }}>
            <Stack sx={{
              display: "flex", alignItems: "center", justifyContent: "center", width: "25%"
            }}>
              <Typography variant='h6'>16</Typography>
              <Typography variant='subtitle1'>Products Purchased</Typography>
            </Stack>
            <Avatar style={{width:"90px",height:"90px",boxShadow: "0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)"}} src={profilePicture} alt={name} />
            <Stack direction={"row"} sx={{ width: "25%" }} spacing={1}>
              <Button color="error" variant="contained">Logout</Button>
            </Stack>
          </Stack>
          <Typography variant='h4'>{name}</Typography>
          <Box sx={{
            boxShadow: "0rem 0rem 0.625rem lightgrey", margin: "20%", padding: "2%",
            borderRadius: "0.625rem 0.938rem", marginBottom: "5%", width: "35%"
          }}>
            <Stack spacing={2}>
              <Stack direction={"row"} spacing={2}>
                <Email />
                <Typography>{email}</Typography>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Phone />
                <Typography>{phoneNumber}</Typography>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <LocationOn />
                <Typography>{city}</Typography>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Fingerprint />
                <Typography>{aadharNumber}</Typography>
              </Stack>
            </Stack>
          </Box>
          <Box className='fitem1' sx={{
            boxShadow: "0rem 0rem 0.625rem lightgrey",
            margin: "5%", padding: "2%", paddingTop: "1%",
            borderRadius: "0.625rem 0.938rem", marginBottom: "5%", width: "35%"
          }}>
            <Stack sx={{ margin: "2%" }} divider={<Divider orientation="horizontal" flexItem />} spacing={1} >
              <Stack direction={"row"} spacing={1}><AccountBalance /><Typography>Address</Typography></Stack>
              <Stack sx={{ padding: "1%" }} spacing={1}>
                <Typography>{line1}</Typography>
                <Typography>{line2}</Typography>
                <Typography>{city}</Typography>
                <Typography>{district} - {pincode}</Typography>
                <Typography>{state}</Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </div>
    </div>
  );
}

export default function () {
  const navigate = useNavigate();
 
  const src = "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Laptops_AugArt23/T1_BB_Laptops_02.gif";


  return (
    <>
      <ProfilePage name={data.name} email={data.email} phoneNumber={data.phoneno} city={data.city} line1={data.addline1} line2={data.addline2} district={data.district} state={data.state} pincode={data.pincode} aadharNumber={data.aadhaarno} profilePicture={src} />
    </>
  )
}