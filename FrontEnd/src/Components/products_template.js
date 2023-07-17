import React, { useState } from "react";
import Image from '../images/Products/costumes.jpeg'
import Header  from "./header";
import Footer from './footer';
import { Button, colors } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ChatIcon from "./ChatBot/chaticon";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import  Highlights from './highlightFeatures';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import RateReviewIcon from '@mui/icons-material/RateReview';


export default function Product(props){

const [add,setAdd]=useState(false);
const [fav,setFav]=useState(false);

function handleChange(){
    setAdd(true);
}

function handleChangeFav(){
    fav?setFav(false):setFav(true);
}

    return(
        <div className="product-display">
            <Header />
            
            <div className="full">
            <div className="left">
                <div>
                    <img src={props.image} alt=""/>
                    <div style={{display:"flex",justifyContent:"space-around",margin:"40px"}}>

                        
                    {add?
                            <Button className='buttonn' variant='contained' sx={{backgroundColor:"green"}} onClick={handleChange}>
                            <CheckCircleRoundedIcon />Added To Cart
                            </Button>:
                            <Button className='buttonn' variant='contained' onClick={handleChange}>
                            <AddShoppingCartIcon /> Add To Cart
                            </Button>
                            }

                    {fav?
                            <IconButton className='buttonn' sx={{color:"red"}} variant='contained'onClick={handleChangeFav}>
                            <FavoriteRoundedIcon />
                            </IconButton>:
                            <IconButton className='buttonn' variant='contained' onClick={handleChangeFav}>
                            <FavoriteBorderRoundedIcon />
                            </IconButton>
                            }


                        <Button href="\cart"><ShoppingCartCheckoutRoundedIcon sx={{color:'#6c6c6c'}} /></Button>

                        </div>
            
                </div>
            </div>
            <div className="right">
            <p style={{fontFamily:'sans-serif',fontSize:'25px'}}>{props.name}</p>
            <br/>
            <GradeRoundedIcon sx={{color:'gold'}} fontSize="small"/>
            <GradeRoundedIcon sx={{color:'gold'}} fontSize="small"/>
            <GradeRoundedIcon sx={{color:'gold'}} fontSize="small"/>
            <GradeRoundedIcon sx={{color:'gold'}} fontSize="small"/>
            <GradeRoundedIcon sx={{color:'gold'}} fontSize="small"/>

            <br/><br/>
            <CurrencyRupeeRoundedIcon fontSize="small"/><span style={{fontSize:"25px"}}>{props.price}</span>
            <br/><br/>
            <LocalOfferRoundedIcon/><span style={{color:'green'}}>{props.discount} % discount . Only @ TrenDify</span>
            <br/><br/><br/>
            <p style={{fontSize:'18px',fontWeight:"1rem",color:'#001717'}}>Descrption:</p>
            <br/>
            <p>
                {props.desc}
            </p> 
             <br/><br/>
            <p style={{fontSize:'18px',fontWeight:"1rem",color:'#001717'}}>Highlight Features:</p>
            <br/><br/>
            {props.high.map(
                Costume =>
                <Highlights highlight={Costume.name}/>
            )}
            <br/><br/>
            <br/>
            <p style={{fontSize:'18px',fontWeight:"1rem",color:'#001717',display:'inline'}}>Write a Review : </p><RateReviewIcon fontSize="small" sx={{display:"inline"}} />
            <br/>
            <form>
            <textarea style={{display:'inline-block',borderRadius:'5px',textAlign:'center',alignContent:'center'}} rows='6' cols='80' placeholder="Write Your Valuable Review here .... Your Review Makes us give You a Good experience... Thanking You..!" />
            <br/><br/>
            <Button variant="outlined">Submit Review</Button>
            <br/><br/><br/>
            </form>
            {add?
                            <Button className='buttonn' variant='contained' sx={{backgroundColor:"green"}} onClick={handleChange}>
                            <CheckCircleRoundedIcon />Added To Cart
                            </Button>:
                            <Button className='buttonn' variant='contained' onClick={handleChange}>
                            <AddShoppingCartIcon /> Add To Cart
                            </Button>
                            }
            <br/><br/><br/>
            </div>
            <ChatIcon />
        </div>
        
        <Footer/>
        </div>
    );
}