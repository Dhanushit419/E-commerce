import React, { useEffect, useState } from "react";
import Header from "./header1";
import Footer from './footer';
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import RateReviewIcon from '@mui/icons-material/RateReview';
import axios from "axios";
import Apiurl from "./Apiurl.js"
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";
import ChatBot from './ChatBot/chatBot';
import TranslateIcon from '@mui/icons-material/Translate';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { Link } from "react-router-dom";

export default function Product(props) {
    const navigate = useNavigate()

    const { id } = useParams();
    const myCookie = new Cookies();
    const Currentid = Number(id)
    const username = myCookie.get("username");

    const [outOfStock,setStockStatus]=useState(props.stock)
    const [add, setAdd] = useState(false);
    const [fav, setFav] = useState(false);
    console.log(props.stock)
    const CurrentItem = { id: Currentid, name: props.name, price: props.price, imgurl: props.image, quantity: 1 }
    console.log(CurrentItem)

    const userDetails = { id: id, username: username }

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const incart = cart.find(item => item.id === Currentid);
        if (incart) {
            setAdd(true)
        }

        // axios({
        //     url:Apiurl+"/cart/checkcart",
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
            url: Apiurl+"/favs/checkfavs",
            method: "POST",
            params: userDetails
        })
            .then((res) => {
                if (res.data.fav) {
                    setFav(true)
                }
            })
    }, [])

    //geting reviews of product
    const Reviews = JSON.parse(localStorage.getItem('reviews'))
    const CurrentItemReviews = Reviews.filter((item) => item.id == id);

    //adding to cart
    function handleChange() {
        //adding to localstorage
        const cart = JSON.parse(localStorage.getItem('cart'));
        // console.log("this is cart")
        //console.log(cart)
        cart.push(CurrentItem)
        // console.log("this is cart after add")
        //console.log(cart)
        localStorage.setItem('cart', JSON.stringify(cart))
        setAdd(true);
        axios({
            url: Apiurl+"/cart/addtocart",
            method: "POST",
            params: userDetails
        })
            .then((res) => {
                if (res.data.added) {
                    console.log("added to cart")
                }
            })
    }

    function handleChangeFav() {
        if (!fav) {
            setFav(true)
            axios({
                url: Apiurl+"/favs/addtofav",
                method: "POST",
                params: userDetails
            })
                .then((res) => {
                    if (res.data.added) {
                        console.log("added to favourites")
                    }
                })
        }
        else {
            setFav(false)
            axios({
                url: Apiurl+"/favs/removefromfav",
                method: "POST",
                params: userDetails
            })
                .then((res) => {
                    if (res.data.removed) {
                        console.log("removed from favourites")
                    }
                })
        }
    }


    const [review, setReview] = useState('');
    const HandleReview = (e) => {
        const updatedReview = e.target.value;
        setReview(updatedReview)
    }


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            Addreview();
        }
    }

    const Review = { id: id, username: username, review: review }

    const Addreview = () => {
        CurrentItemReviews.push(Review)
        localStorage.setItem('reviews', JSON.stringify(CurrentItemReviews))
        window.location.reload();

        axios({
            url: Apiurl+'/others/addreview',
            method: 'POST',
            params: Review
        })
            .then((res) => {

            })
            .catch((err) => {
                console.log(err);
            })
    }
/*Sample codee given by microsoft

    const axios = require('axios').default;
    const { v4: uuidv4 } = require('uuid');

    let key = "<your-translator-key>";
    let endpoint = "https://api.cognitive.microsofttranslator.com";

    // location, also known as region.
    // required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
    let location = "<YOUR-RESOURCE-LOCATION>";

    axios({
        baseURL: endpoint
        url: '/translate'
        method: 'post'
        headers: {
            'Ocp-Apim-Subscription-Key': key
             // location required if you're using a multi-service or regional (not global) resource.
            'Ocp-Apim-Subscription-Region': location
            'Content-type': 'application/json'
            'X-ClientTraceId': uuidv4().toString()
        }
        params: {
            'api-version': '3.0'
            'from': 'en'
            'to': ['fr', 'zu']
        }
        data: [{
            'text': 'I would really like to drive your car around the block a few times!'
        }]
        responseType: 'json'
    }).then(function(response){
        console.log(JSON.stringify(response.data, null, 4));
    })

*/
    const [translator, setTranslator] = useState(false);

    const [desc, setDesc] = useState({ original: props.desc, translated: "" });
    const [name, setName] = useState({ original: props.name, translated: "" });
    const [high1, setHigh1] = useState({ original: props.highlight1, translated: "" });
    const [high2, setHigh2] = useState({ original: props.highlight2, translated: "" });
    const [high3, setHigh3] = useState({ original: props.highlight3, translated: "" });
    
    const { v4: uuidv4 } = require('uuid');

    const bingEndPoint = "https://api.cognitive.microsofttranslator.com/";
    const key="f387d7a967eb4b1e9297cbeaedbcc756"
    const translate = () => {
      const textsToTranslate = [
        { text: name.original },
        { text: desc.original },
        { text: high1.original },
        { text: high2.original },
        { text: high3.original }
      ];
    
      axios({
        baseURL: bingEndPoint,
        url:"/translate",
        method: "post",
        headers: {
            'Ocp-Apim-Subscription-Key': key,
            //c8f3e083e7424817aff39a4ea9808fc7
            //f387d7a967eb4b1e9297cbeaedbcc756
            'Ocp-Apim-Subscription-Region': "centralindia",
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
        },
        params: {
          'api-version': '3.0',
          'from': 'en',
          'to': ['ta']
        },
        data: textsToTranslate,
        responseType: 'json',
        timeout: 10000, 
      }).then(res => {
        setName({ original: name.original, translated: res.data[0].translations[0].text });
        setDesc({ original: desc.original, translated: res.data[1].translations[0].text });
        setHigh1({ original: high1.original, translated: res.data[2].translations[0].text });
        setHigh2({ original: high2.original, translated: res.data[3].translations[0].text });
        setHigh3({ original: high3.original, translated: res.data[4].translations[0].text });
    
        console.log("Translation results:", res.data);
      }).catch(err => {
        console.error("Error in translating text:", err);
        console.log("Request details:", err.config);
        if (err.response) {
          console.log("API Error Response Data:", err.response.data);
          console.log("API Error Response Status:", err.response.status);
          console.log("API Error Response Headers:", err.response.headers);
        }
      });
    }
    
  
    useEffect(()=>{
        translate()
    },[])

    return (

        <div className="product-display">
            <header className="header-home" style={{ display: "flex", justifyContent: 'space-between' }}>
          <div className="header-search-bar-container">
            <div className="header-search-bar">
              <Link to='/products'>
                <input type="text" id="search" className="header-search-input-header1" placeholder="  Search here.." />
              </Link>
            </div>
            <div className="header-search-bar">
              <button className="header-search-button" onClick={() => { navigate("/products") }}><SearchIcon sx={{ color: "white" }} /></button>
              <button className="header-search-button img" onClick={() => { navigate("/products") }} ><ImageSearchIcon sx={{ color: "white" }} /></button>
            </div>
          </div>
          <div className="header-buttons">
          <p className="button" onClick={()=>{
            translator?setTranslator(false):setTranslator(true)
          }} ><TranslateIcon/>{translator?<span>Translated</span>:<span>Translate</span>}</p>
            <a href="\products" className="button">Products</a>
            <a href="\profile" className="button">Profile</a>
            <a href="/about" className="button" >About</a>
            
            
          </div>

        </header>
            
            <div className="full">
                <div className="left">
                    <div>
                        <img src={props.image} alt={props.name} />
                        <div style={{ display: "flex", justifyContent: "space-between", margin: "40px" }}>


                            {outOfStock<=0?
                            <Button startIcon={<SentimentDissatisfiedIcon fontSize="large" />} className='buttonn' variant='contained' disabled>
                            Out of Stock
                            </Button>
                            :add ?
                                <Button startIcon={<CheckCircleRoundedIcon fontSize="large" />} className='buttonn' variant='contained' sx={{ backgroundColor: "green" }}>
                                    Added To Cart
                                </Button> :
                                <Button startIcon={<AddShoppingCartIcon />} className='buttonn' variant='contained' onClick={handleChange}>
                                    Add To Cart
                                </Button>
                            }

                            {fav ?
                                <IconButton className='buttonn' sx={{ color: "red" }} variant='contained' onClick={handleChangeFav}>
                                    <FavoriteRoundedIcon />
                                </IconButton> :
                                <IconButton className='buttonn' variant='contained' onClick={handleChangeFav}>
                                    <FavoriteBorderRoundedIcon />
                                </IconButton>
                            }


                            <Button href="\cart"><ShoppingCartCheckoutRoundedIcon sx={{ color: '#6c6c6c' }} /></Button>

                        </div>

                    </div>
                </div>
                <div className="right">
                    <p style={{ fontFamily: 'sans-serif', fontSize: '25px' }}>{translator?name.translated:name.original} </p>
                    <br />
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                        <p >Ratings : {props.rating} </p><GradeRoundedIcon sx={{ color: 'gold' }} fontSize="small" />
                    </div>

                    {/* <GradeRoundedIcon sx={{color:'gold'}} fontSize="small"/>
                    <GradeRoundedIcon sx={{color:'gold'}} fontSize="small"/>
                    <GradeRoundedIcon sx={{color:'gold'}} fontSize="small"/>
                    <GradeRoundedIcon sx={{color:'gold'}} fontSize="small"/> */}

                    <br /><br />
                    <div style={{ display: "inline-flex", alignItems: 'center' }}>
                        <CurrencyRupeeRoundedIcon fontSize="medium" /><span style={{ fontSize: "25px" }}>{props.price}</span>
                    </div>
                    <br /><br />
                    <div style={{ display: "inline-flex", alignItems: 'center' }}>
                    <LocalOfferRoundedIcon /><span style={{ color: 'green' }}>{props.discount}{translator?<span>% தள்ளுபடி டிரெண்டிஃபையில்  மட்டுமே @ TrenDify 😇</span>:<span>% discount Only @ TrenDify</span>} </span>
                    </div><br /><br />
                    <p style={{ fontSize: '18px', fontWeight: "1rem", color: '#001717' }}>In Stock : {outOfStock>0?props.stock:<span>Out Of Stock</span>}</p>
                    <br />
                    <p style={{ fontSize: '18px', fontWeight: "1rem", color: '#001717' }}>Description:</p>
                    <br />
                    <p>
                        {translator?desc.translated:desc.original}
                    </p>
                    <br /><br />
                    <p style={{ fontSize: '18px', fontWeight: "1rem", color: '#001717' }}>Highlight Features:</p>
                    <br /><br />
                    <li>
                    {translator?high1.translated:high1.original}                    </li>
                    <li>
                    {translator?high2.translated:high2.original}                    </li>
                    <li>
                    {translator?high3.translated:high3.original}                    </li>
                    <br /><br />
                    <p style={{ fontSize: '18px', fontWeight: "1rem", color: '#001717' }}>Seller Name : {props.seller}</p>

                    <br />
                    <p style={{ fontSize: '18px', fontWeight: "1rem", color: '#001717' }}>Reviews:✨</p>
                    <p>({CurrentItemReviews.length} reviews)</p>
                    <br />
                    {CurrentItemReviews.map((item) => (
                        <div>
                            <p style={{ display: "inline-flex", textDecoration: "underline", alignItems: 'center' }}>📝  <em>by user : {item.username}</em></p>
                            <br />
                            <p>{item.review}</p>
                            <br />
                        </div>

                    )
                    )}
                    <br />


                    <p style={{ fontSize: '18px', fontWeight: "1rem", color: '#001717', display: 'inline' }}>Write a Review : </p><RateReviewIcon fontSize="small" sx={{ display: "inline" }} />
                    <br />
                    <form>
                        <textarea onChange={HandleReview} onKeyDown={handleKeyPress} style={{ display: 'inline-block', borderRadius: '5px', textAlign: 'center', alignContent: 'center' }} rows='6' cols='80' placeholder="Write Your Valuable Review here .... Your Review Makes us give You a Good experience... Thanking You..!" />
                        <br /><br />

                        <Button variant="outlined" onClick={Addreview}>Submit Review</Button>

                        <br /><br /><br />
                    </form>
                    {outOfStock<=0?
                            <Button startIcon={<SentimentDissatisfiedIcon fontSize="large" />} className='buttonn' variant='contained' disabled>
                            Out of Stock
                            </Button>
                            :
                            add ?
                        <Button startIcon={<CheckCircleRoundedIcon fontSize="large" />} className='buttonn' variant='contained' sx={{ backgroundColor: "green" }}>
                            Added To Cart
                        </Button> :
                        <Button startIcon={<AddShoppingCartIcon />} className='buttonn' variant='contained' onClick={handleChange}>
                            Add To Cart
                        </Button>
                    }
                    <br /><br /><br />
                </div>
            </div>
            <ChatBot/>
            <Footer />
        </div>
    );
}