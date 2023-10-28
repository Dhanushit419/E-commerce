// import React ,{useEffect}from 'react';
// import Footer from '../Components/footer';
// import { Cookies } from 'react-cookie';
// import ChatBot from '../Components/ChatBot/chatBot';



// export default function About(){
//     useEffect(() => {
//         document.title = "About - Trendify"
//       }, [])

//     const myCookie=new Cookies();
//     const username=myCookie.get('username');
//     return (
        
//         <div className='about1'>
//                  <header className='header-home'>
//       <a href="\home" className="button">Home</a>
//       <a href="\products" className="button">Products</a>
//           {username?<a href="\profile" className="button">Profile</a>:<a href="/login" className="button">Login</a>}
//       </header>
//         <div className="about-section">
//         <div className="inner-container">
//             <h1>About us</h1>
//             <p className="text"> Trendify is a cutting-edge shopping app crafted with passion and creativity
//              by a dedicated team of three individuals from the prestigious IT department
//               of Anna University. We are committed to revolutionizing the way you shop,
//                making it an unforgettable and enjoyable experience.</p>
//         <br />
//         <h2><em>Hope You Enjoyed it !❤</em></h2>
//         </div>
//         </div>
//         <Footer />
//         <ChatBot/>

//     </div>
//     );
// }


import React from 'react'
import pic1 from "../images/team/dhanush.jpg";
import pic2 from "../images/team/athiyan.jpg";
import pic3 from "../images/team/shashi.jpg";
import { Link, Element } from 'react-scroll'
import { Navigate, useNavigate } from 'react-router-dom'
function About() {
  const navigate = useNavigate();
  return (
    <div className='aboutmaindiv'>
    <section id="about" className="section1">
        <div className="container1" >
            <div className="section1-content">
               <div className="image-container1">
                    <img className="app-image" src={"https://img.freepik.com/free-vector/shopping-cart-vector-technology-icon-gold-gradient-background_53876-114066.jpg?w=360&t=st=1676298137~exp=1676298737~hmac=4e0c549fce164599aff1bb10117380bd26bcc3cd0b6a8a066a3d37da16af228b"}  />
                </div>
                <div>
               <div className="section1-title1">Trendify<br />
               <div style={{fontSize:"1rem", marginLeft:"20px"}}>Where shopping meets convenience✨</div>
               </div>
               </div>
            </div>
            <div style={{display:"flex", justifyContent:"center", columnGap:"30px"}}>
              <Link
               to="feat" 
               spy={true} smooth={true} duration={500}
               delay={0}
              >
                Features
                </Link>
                <Link
               to="about-us" 
               spy={true} smooth={true} duration={500}
               delay={0}
              >
                Our Team
                </Link>
                <span onClick={()=> {
                  navigate("/home")
                }}>
                  Get started
                </span>
            </div>
        </div>
    </section>
    <Element id="feat">
    <section id="features" className="section1 features" style={{height:"140vh"}}>
        <div className="container1">
            <h2 className="section1-title">Key Features</h2>
            <div className="feature">
                <div className="feature-image">
                <img style={{mixBlendMode:"multiply"}} src="https://is2-ssl.mzstatic.com/image/thumb/Purple49/v4/92/06/5e/92065ebd-3ce4-0bbd-f74e-903989111164/source/512x512bb.jpg" alt="Change Native Language" />
                </div>
                <div className="feature-info">
                    <h3 className="feature-title">Image searching</h3>
                    <p>Enabling efficient search and retrieval of relevant images using TensorFlow involves using deep learning techniques to analyze and understand images.</p>
                </div>
            </div>
            <div className="feature">
                <div className="feature-image">
                <img style={{mixBlendMode:"multiply"}} src="https://i.pinimg.com/originals/03/b5/06/03b5063e4d6ecf649ef1c005e6e1fb15.png" />
                </div>
                <div className="feature-info">
                    <h3 className="feature-title">Chatbot support</h3>
                    <p>Enhancing customer experience with our Chatbot Support: Instant Solutions, Personalized Assistance, Seamless Integration.</p>
                </div>
            </div>
            <div className="feature">
                <div className="feature-image">
                <img style={{mixBlendMode:"multiply"}} src="https://i.pinimg.com/originals/97/0b/07/970b076574ddb5ee7723fb9d6f588fcd.jpg"></img>
                </div>
                <div className="feature-info">
                    <h3 className="feature-title">Native language translation</h3>
                    <p>Break Language Barriers Effortlessly: Unlock Seamless Communication with Native Language Translation using Microsoft API</p>
                </div>
            </div>
            <div className="feature">
                <div className="feature-image">
                    <img style={{mixBlendMode:"multiply"}} src="https://th.bing.com/th/id/R.7303380bbcaa86d3ae0bcf5ecffe55c2?rik=SaSFDnIMisYSUg&riu=http%3a%2f%2fkurucz.ca%2fexpatrepat%2fimages%2frecommended.jpg&ehk=6Z8LHwG2i8apwENdVuB54aIl8A4Fq8I%2fiE68Lk3t8yE%3d&risl=&pid=ImgRaw&r=0" />
                </div>
                <div className="feature-info">
                    <h3 className="feature-title">Product recomendation</h3>
                    <p>Tailored Recommendations, Instantly Delivered: Elevate Customer Satisfaction with Personalized Product Suggestions powered by ChatGPT API.</p>
                </div>
            </div>
            
        </div>
    </section>
    </Element>
    <Element id="about-us">
    <section id="features" className="section1 features" style={{height:"70vh", backgroundColor:"#fff"}}>
    <h2 className="section1-title">Our Team</h2>
        <div className="container-cont">
            {[
              {name:"Dhanush",role:"Fullstack Developer",img:pic1},
              {name:"Aathithyan Maariraj",role:"Frontend Developer",img:pic2},
              {name:"S B Shashi",role:"Frontend Devloper",img:pic3}].map(e => 
                <div className="developer-row">
                <div className="developer-photo">
                <img src={e.img}></img>
                </div>
                <div className="developer-info">
                    <h3>{e.name}</h3>
                    <p>{e.role}</p>
                  </div>
              </div>
              )}
        </div>
    </section>
    </Element>
    </div>
  )
}

export default About
