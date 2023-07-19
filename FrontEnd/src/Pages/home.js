import React from 'react';
import Title from '../Components/title';
import SearchIcon from '@mui/icons-material/Search';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import IconButton from '@mui/material/IconButton';
import './styles.css';
import Header from '../Components/header';
import Footer from '../Components/footer';
import Products from '../Components/home_product';
import Card from '../Components/home_card';
import ChatIcon from "../Components/ChatBot/chaticon";




export default function Home(){
    return (
<div>
      <div className="background-container">
      <header className='header-home'>
      <a href="\" className="button">Home</a>
          <a href='\about' className="button">About</a>
          <a href="\login" className="button">Login</a>
      </header>

      
      <div className="search-bar-container">
          <input type="text" className="search-input" placeholder="  Unleash Your Shopping With TrenDify !..." />
       
        <IconButton className="search-button" href='\products'><SearchIcon sx={{ color: "white"}}/></IconButton>
          <IconButton className="search-button img" type='file'><ImageSearchIcon sx={{ color: "white"}}/></IconButton>
      </div>
    </div>
    <ChatIcon/>

    <h1 className='mid' >TrenDify  ~ Top Deals </h1>
    
    
    <div className='carddiv'>
      {Products.map(Products =>
    <Card name={Products.name} 
      path={Products.path} 
     img={Products.img} 
     alt={Products.name}
     content={Products.content}
      />
  
)}
      
    </div>
    <Footer />
</div>


    );
}