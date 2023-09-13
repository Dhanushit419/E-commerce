import React ,{useEffect}from 'react';
import Footer from '../Components/footer';
import { Cookies } from 'react-cookie';
import ChatBot from '../Components/ChatBot/chatBot';



export default function About(){
    useEffect(() => {
        document.title = "About - Trendify"
      }, [])

    const myCookie=new Cookies();
    const username=myCookie.get('username');
    return (
        
        <div className='about1'>
                 <header className='header-home'>
      <a href="\home" className="button">Home</a>
      <a href="\products" className="button">Products</a>
          {username?<a href="\profile" className="button">Profile</a>:<a href="/login" className="button">Login</a>}
      </header>
        <div className="about-section">
        <div className="inner-container">
            <h1>About us</h1>
            <p className="text"> Trendify is a cutting-edge shopping app crafted with passion and creativity
             by a dedicated team of three individuals from the prestigious IT department
              of Anna University. We are committed to revolutionizing the way you shop,
               making it an unforgettable and enjoyable experience.</p>
        <br />
        <h2><em>Hope You Enjoyed it !❤</em></h2>
        </div>
        </div>
        <Footer />
        <ChatBot/>

    </div>
    );
}
