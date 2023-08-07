import Header from '../Components/header1';
import React, { useState } from "react";
import { Avatar } from '@material-ui/core';
import { Button } from '@mui/material';
import { Email, Phone, Home, ExitToAppOutlined, Height } from '@material-ui/icons';
import { Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import Apiurl from '../Components/Apiurl.js'
import { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Profile() {
  useEffect(() => {
    document.title = "Profile - Trendify"
  }, [])

  const myCookie = new Cookies();
  const username = myCookie.get('username');
  const navigate = useNavigate();

  const logOut = () => {
    myCookie.remove('username')
    navigate("/login")
  }

  const [userDetails, setUserDetails] = useState([])
  const [fetch, setFetch] = useState(false)
  useEffect(() => {
    //console.log(username)
    axios({
      url: Apiurl + '/user/profile',
      method: 'GET',
      params: { username }
    })
      .then((res) => {
        console.log(res.data)
        setUserDetails(res.data)
        setFetch(true)
      })

  }, [])

  return (
    <div className='profilemain'>
      <div>


        <header className="header-home" style={{ display: "flex", justifyContent: 'space-between' }}>
          <div className="header-search-bar-container">
            <div className="header-search-bar">
              <Link to='/products'>
                <input type="text" id="search" className="header-search-input-header1" placeholder="  Search here.." />
              </Link>
            </div>
            <div className="header-search-bar">
              <button className="header-search-button" onClick={() => { navigate("/products") }}><SearchIcon sx={{ color: "white" }} /></button>
              <button className="header-search-button img"><ImageSearchIcon sx={{ color: "white" }} /></button>
            </div>
          </div>
          <div className="header-buttons">
            <a href="\home" className="button">Home</a>
            <a href="/favs" className="button" >Favorites</a>
            <a href="/cart" className="button">Cart<ShoppingCartIcon fontSize="small" /></a>
            <a href="/orders" className="button" >Orders</a>

          </div>

        </header>
      </div>



      <div class="profile1">

        <div class="profile2">
        {myCookie.get("username") ?
        
          !fetch ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" style={{ height: '100px' }} alt="" /></div> :
            <div>

              <div className='prof-bar'>
                <div className='child'><span className='count-span'><h2>{userDetails.count}</h2> products purchased</span></div>
                <div className='avatar1'>
                  <Avatar src='https://i.ibb.co/TMmLqCh/Trendify.jpg' style={{ width: "120px", height: "120px", boxShadow: "0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)" }} />
                </div>
                <div className='child'><Button variant='contained' onClick={logOut}>LOGOUT</Button></div>

              </div>
              <div>
                <h1>{username}</h1>
              </div>
              <div className='par-2' style={{ display: "flex", flexDirection: "column", width: "300px", margin: "auto", rowGap: "13px", marginTop: "10px" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Email fontSize='large' />
                  <div>
                    <p>{userDetails.email}</p>
                  </div>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Phone fontSize='large' />
                  <div>
                    <p>{userDetails.mobile}</p>
                  </div>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <LocationOnIcon fontSize='large' />
                  <div>
                    <p>{userDetails.city}</p>
                  </div>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Home fontSize='large' />
                  <span className='address'>{userDetails.address}</span>
                </Stack>
              </div> 
            
            </div>  :
             <div style={{fontFamily: "'Sacramento',cursive",display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"space-evenly"}}>

              <h1 >Login to Continue...</h1>
            <Button variant='contained' endIcon={<ExitToAppOutlined />} onClick={()=>{
                navigate("/login")
              }} sx={{height:"40px",margin:"auto"}} >Login</Button>
            </div>
          
        }
        </div>

      </div>


    </div>


  )
};