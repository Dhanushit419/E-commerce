import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import { Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Apiurl from "./Apiurl.js"
export default function Favs(props) {
    const [add, setAdd] = useState(false);
    const myCookie = new Cookies();
    const username = myCookie.get('username')

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const incart = cart.find(item => item.id === props.id);
        if (incart) {
            setAdd(true)
        }
    }, [])
    //adding to cart
    const handleClick = (id, name, price, image) => {
        const userDetails = { id: id, username: username }
        const CurrentItem = { id: id, name: name, price: price, imgurl: image, quantity: 1 }

        //adding to localstorage
        const cart = JSON.parse(localStorage.getItem('cart'));
        // console.log("this is cart")
        //console.log(cart)
        cart.push(CurrentItem)
        // console.log("this is cart after add")
        //console.log(cart)
        localStorage.setItem('cart', JSON.stringify(cart))

        axios({
            url: Apiurl + "/cart/addtocart",
            method: "POST",
            params: userDetails
        })
            .then((res) => {
                if (res.data.added) {
                    console.log("added to cart")
                    setAdd(true);
                }
            })
    }

    return (

        <tr>
            <td>{props.index + 1}</td>
            <td><Link to={`/view/productid/${props.id}`}><img src={props.img} alt="" height="80px" width="80px" /></Link></td>
            <td>{props.name}</td>
            <td>
                {add ?
                    <Button startIcon={<ShoppingCartIcon fontSize="large" />} className='buttonn' variant='contained' sx={{ backgroundColor: "green" }}>
                        In Cart
                    </Button> :
                    <Button startIcon={<AddShoppingCartIcon />} className='buttonn' variant='contained' onClick={() => handleClick(props.id, props.name, props.price, props.img)}>
                        Add To Cart
                    </Button>
                }
            </td>
        </tr>
    )
}