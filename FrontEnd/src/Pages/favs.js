import React, { useEffect, useState } from "react";
import Header from "../Components/header1"
import { Cookies } from "react-cookie";
import axios from "axios";
import { Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Favs from "../Components/favs_template";

export default function Favourites(){
    const navigate=useNavigate()
    const myCookie=new Cookies();
    const username=myCookie.get('username')
    const [favs,setfavs]=useState([]);

    useEffect(()=>{
        axios({
            url:'http://localhost:3001/getfavs',
            method:'GET',
            params:{username}
        })
        .then((res)=>{
            setfavs(res.data.list)
            console.log(res.data.list)
        })
    },[])

    return (
    <div className="favsmain">
        <Header />
        <div className="profile2" style={{display:'flex',justifyContent:'center',marginLeft:'200px',width:'600px',overflow:'scroll'}}>
            {favs && favs.length>0?<table>
                <thead>
                <tr><th colSpan={4}>Favourite Items of {username} ❤️</th></tr>
                <tr>
                <th>S.no</th>
                <th>Image</th>
                <th>Name</th>
                <th>Add to Cart</th>
                </tr>
                </thead>
                <tbody>
                {
                    favs.map((item,index)=>(
                            <Favs 
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            img={item.img}
                            index={index}
                            />
                    ))
                }
                </tbody>
            </table>
            :<div style={{display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
            <h1>No Favourite Found ! </h1>
            <Button variant="contained"  startIcon={<AddShoppingCartIcon/>} onClick={()=>{navigate("/products")}}>Shop Now</Button>
            </div>}

        </div>
    </div>)
}