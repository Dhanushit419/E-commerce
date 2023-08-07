import React, { useState, useEffect } from "react";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import axios from "axios";
import Apiurl from "./Apiurl.js"
import { Cookies } from "react-cookie";



export default function Card(props) {
    const myCookie = new Cookies();
    const username = myCookie.get("username");

    const [outOfStock, setStockStatus] = useState(props.stock)
    console.log(props.stock)
    const [add, setAdd] = useState(false);
    const [fav, setFav] = useState(false);

    const userDetails = { id: props.id, username }
    useEffect(() => {
        //checking the local storage
        const cart = JSON.parse(localStorage.getItem('cart'));
        const incart = cart.find(item => item.id === props.id);
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
            url: Apiurl + "/favs/checkfavs",
            method: "POST",
            params: userDetails
        })
            .then((res) => {
                if (res.data.fav) {
                    setFav(true)
                }
            })

    }, [])


    const CurrentItem = { id: props.id, name: props.name, price: props.price, imgurl: props.image, quantity: 1 }
    //console.log(CurrentItem)
    function handleChange() {
        //addting to localstorage
        const cart = JSON.parse(localStorage.getItem('cart'));
        // console.log("this is cart")
        // console.log(cart)
        cart.push(CurrentItem)
        // console.log("this is cart after add")
        // console.log(cart)
        localStorage.setItem('cart', JSON.stringify(cart))

        setAdd(true);
        axios({
            url: Apiurl + "/cart/addtocart",
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
                url: Apiurl + "/favs/addtofav",
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
                url: Apiurl + "/favs/removefromfav",
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

    return (
        <div className="card-data">
            <div style={{ display: 'block' }}>
                <div style={{ display: 'inline-block' }}>
                    {/* <button  onClick={display} style={{border:"none"}}> */}
                    <Link to={`/view/productid/${props.id}`}>
                        <img src={props.image} alt="" />
                    </Link>
                    {/* </button > */}
                </div>
                <h3 style={{ marginLeft: '10px', width: "160px", overflow: "hidden" }}>{props.name}</h3>
                <div style={{ display: "inline-flex", alignItems: 'center' }}>
                    <CurrencyRupeeRoundedIcon fontSize="small" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px' }} />
                    <span style={{ fontSize: '19px' }}>{props.price}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <LocalOfferRoundedIcon fontSize="very-small" sx={{ display: "inline-block", marginLeft: '10px' }} /><span style={{ color: 'green', fontSize: 'small', marginLeft: '10px' }}>{props.discount}% discount</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>

                    {outOfStock<=0? <IconButton className='buttonn' variant='contained' disabled>
                        <SentimentDissatisfiedIcon />
                    </IconButton>
                        : add ?
                            <IconButton className='buttonn' variant='contained'>
                                <CheckCircleRoundedIcon sx={{ color: 'green' }} />
                            </IconButton> :
                            <IconButton className='buttonn' variant='contained' onClick={handleChange}>
                                <AddShoppingCartIcon />
                            </IconButton>
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

    );
}