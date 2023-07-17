import React from 'react';
import './style-about.css';
import Footer from '../Components/footer';

export default function about(){
    return (
        <div className='about1'>
                 <header className='header-home'>
      <a href="\" className="button">Home</a>
          <a href='\about' className="button">About</a>
          <a href="\login" className="button">Login</a>
      </header>
        <div className="about-section">
        <div className="inner-container">
            <h1>About us</h1>
            <p className="text"> TrenDify aims to create an E-Commerce
                application which is user-friendly to all types of
                users and to give assistance to the users. It helps the user 
            to search their query by Image . It has a Chat-Bot which helps the user to 
        get easy assistance and to know about the product.</p>
        <br />
        <h2><em>Hope You Enjoyed it !❤</em></h2>
        </div>
        </div>
        <Footer />
    </div>
    );
}
