import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import IconButton from '@mui/material/IconButton';
import Footer from '../Components/footer';
import Card from '../Components/home_card';
import ChatIcon from "../Components/ChatBot/chaticon";
import { Cookies } from "react-cookie";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Apiurl from '../Components/Apiurl.js'
import Toplist from '../Components/topproducts';


export default function Home() {
  useEffect(() => {
    document.title = "Home - Trendify"
  }, [])
  const myCookie = new Cookies();
  const username = myCookie.get("username");
  //   const[cart,setCart]=useState([])

  //   useEffect(()=>{
  //           axios({
  //               url:Apiurl+"/cart/cart",
  //               method:"GET",
  //               params:{username}
  //           })
  //           .then((res)=>{
  //               setCart(res.data.list)
  //           })
  //           .catch((err)=>{
  //               console.log(err);
  //           })

  //   },[])
  //   const cartItems = cart.map((item) => ({ ...item, quantity: 1 }));
  //   localStorage.setItem('cart',JSON.stringify(cartItems))
  //console.log(JSON.parse(localStorage.getItem('cart')))


  return (
    <div>
      <div className="background-container">
        <header className='header-home'>
          <a href="/products" className="button">Products</a>
          {username ? <a href="/profile" className="button">Profile</a> : <a href="/login" className="button">Login</a>}
          <a href='/about' className="button">About</a>
        </header>


        <div className="search-bar-container">
          <Link to='/products'>
            <input type="text" className="search-input" placeholder="  Unleash Your Shopping With TrenDify !..." />
          </Link>

          <IconButton className="search-button" href='/products'><SearchIcon sx={{ color: "white" }} /></IconButton>
          <IconButton className="search-button img" href='/products' type='file'><ImageSearchIcon sx={{ color: "white" }} /></IconButton>
        </div>
      </div>
      <ChatIcon />

      <h1 className='mid' >TrenDify  ~ Top Deals </h1>


      <div className='carddiv'>
        {Toplist.map(Product =>
          <Card name={Product.name}
            id={Product.id}
            img={Product.imgurl}
            alt={Product.name}
            content={Product.highlight1}
            price={Product.price}
          />

        )}

      </div>
      <Footer />
    </div>


  );
}