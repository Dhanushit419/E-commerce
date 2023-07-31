import React, { useEffect, useState } from "react";
import Image from '../images/Products/costumes.jpeg'
import Header  from "./header1";
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
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import RateReviewIcon from '@mui/icons-material/RateReview';
import axios from "axios";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";


export default function Product(props){

const {id} =useParams();
const myCookie=new Cookies();
const Currentid=Number(id)
const username=myCookie.get("username");

const [add,setAdd]=useState(false);
const [fav,setFav]=useState(false);

const CurrentItem={id:Currentid,name:props.name,price:props.price,imgurl:props.image,quantity:1}
console.log(CurrentItem)

const userDetails={id:id,username:username}

    useEffect(()=>{
        const cart=JSON.parse(localStorage.getItem('cart'));
        const incart = cart.find(item => item.id === Currentid);
        if(incart){
            setAdd(true)
        }

        // axios({
        //     url:"http://localhost:3001/checkcart",
        //     method:"POST",
        //     params:userDetails
        // })
        // .then((res)=>{
        //     if(res.data.incart){
        //         setAdd(true)
        //     }
        //     if(res.data.fav){
        //         setFav(true)
        //     }
        // })
        axios({
            url:"http://localhost:3001/checkfavs",
            method:"POST",
            params:userDetails
        })
        .then((res)=>{
            if(res.data.fav){
                setFav(true)
            }
        })
    },[])

//geting reviews of product
const Reviews=JSON.parse(localStorage.getItem('reviews'))
const CurrentItemReviews = Reviews.filter((item) => item.id == id);

//adding to cart
function handleChange(){
        //adding to localstorage
        const cart=JSON.parse(localStorage.getItem('cart'));
       // console.log("this is cart")
        //console.log(cart)
        cart.push(CurrentItem)
       // console.log("this is cart after add")
        //console.log(cart)
        localStorage.setItem('cart',JSON.stringify(cart))
        setAdd(true);
        axios({
            url:"http://localhost:3001/addtocart",
            method:"POST",
            params:userDetails
        })
        .then((res)=>{
            if(res.data.added){
                console.log("added to cart")
            }
        })
    }
    

function handleChangeFav(){
    if(!fav){
        setFav(true)
        axios({
            url:"http://localhost:3001/addtofav",
            method:"POST",
            params:userDetails
        })
        .then((res)=>{
            if(res.data.added){
                console.log("added to favourites")
            }
        })
    }
    else{
        setFav(false)
        axios({
            url:"http://localhost:3001/removefromfav",
            method:"POST",
            params:userDetails
        })
        .then((res)=>{
            if(res.data.removed){
                console.log("removed from favourites")
            }
        })
    }
}


const [review,setReview]=useState('');
const HandleReview =(e)=>{
    const updatedReview = e.target.value;
    setReview(updatedReview)
}


const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      Addreview();
    }
  }

const Review={id:id,username:username,review:review}

const Addreview =()=>{
    CurrentItemReviews.push(Review)
    localStorage.setItem('reviews',JSON.stringify(CurrentItemReviews))
    window.location.reload();

    axios({
        url:'http://localhost:3001/addreview',
        method:'POST',
        params:Review
    })
    .then((res)=>{

    })
    .catch((err)=>{
        console.log(err);
    })
}


    return(
        <div className="product-display">
            <Header />
            
            <div className="full">
            <div className="left">
                <div>
                    <img src={props.image} alt={props.name}/>
                    <div style={{display:"flex",justifyContent:"space-between",margin:"40px"}}>

                        
                    {add?
                            <Button startIcon={<CheckCircleRoundedIcon fontSize="large"/> } className='buttonn' variant='contained' sx={{backgroundColor:"green"}}>
                            Added To Cart
                            </Button>:
                            <Button startIcon={<AddShoppingCartIcon /> } className='buttonn' variant='contained' onClick={handleChange}>
                            Add To Cart
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
            <div style={{display:'flex',alignItems:'center'}} >
            <p >Ratings : {props.rating} </p><GradeRoundedIcon sx={{color:'gold'}} fontSize="small"/>
            </div>
            
            {/* <GradeRoundedIcon sx={{color:'gold'}} fontSize="small"/>
            <GradeRoundedIcon sx={{color:'gold'}} fontSize="small"/>
            <GradeRoundedIcon sx={{color:'gold'}} fontSize="small"/>
            <GradeRoundedIcon sx={{color:'gold'}} fontSize="small"/> */}

            <br/><br/>
            <div style={{display:"inline-flex",alignItems:'center'}}>
            <CurrencyRupeeRoundedIcon fontSize="medium"/><span style={{fontSize:"25px"}}>{props.price}</span>
            </div>
            <br/><br/>
            <div style={{display:"inline-flex",alignItems:'center'}}>
            <LocalOfferRoundedIcon/><span style={{color:'green'}}>{props.discount} % discount . Only @ TrenDify</span>
            </div>
            <br/><br/><br/>
            <p style={{fontSize:'18px',fontWeight:"1rem",color:'#001717'}}>Descrption:</p>
            <br/>
            <p>
                {props.desc}
            </p> 
             <br/><br/>
            <p style={{fontSize:'18px',fontWeight:"1rem",color:'#001717'}}>Highlight Features:</p>
            <br/><br/>
            <li>
                {props.highlight1}
            </li>
            <li>
                {props.highlight2}
            </li>            
            <li>
                {props.highlight3}
            </li>
            <br/><br/>
            <p style={{fontSize:'18px',fontWeight:"1rem",color:'#001717'}}>Seller Name : {props.seller}</p>

            <br/>
            <p style={{fontSize:'18px',fontWeight:"1rem",color:'#001717'}}>Reviews:✨</p>
            <p>({CurrentItemReviews.length} reviews)</p>
            <br/>
            {CurrentItemReviews.map((item)=>(
                <div>
                <p style={{display:"inline-flex" ,textDecoration:"underline",alignItems:'center'}}>📝  <em>by user : {item.username}</em></p>
                <br/>
                <p>{item.review}</p>
                <br/>
                </div>
                
            )
            )}
            <br/>


            <p style={{fontSize:'18px',fontWeight:"1rem",color:'#001717',display:'inline'}}>Write a Review : </p><RateReviewIcon fontSize="small" sx={{display:"inline"}} />
            <br/>
            <form>
            <textarea onChange={HandleReview} onKeyDown={handleKeyPress} style={{display:'inline-block',borderRadius:'5px',textAlign:'center',alignContent:'center'}} rows='6' cols='80' placeholder="Write Your Valuable Review here .... Your Review Makes us give You a Good experience... Thanking You..!" />
            <br/><br/>

            <Button variant="outlined" onClick={Addreview}>Submit Review</Button>

            <br/><br/><br/>
            </form>
            {add?
                            <Button startIcon={<CheckCircleRoundedIcon fontSize="large"/> } className='buttonn' variant='contained' sx={{backgroundColor:"green"}}>
                            Added To Cart
                            </Button>:
                            <Button startIcon={<AddShoppingCartIcon /> } className='buttonn' variant='contained' onClick={handleChange}>
                            Add To Cart
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