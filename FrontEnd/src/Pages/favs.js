import React, { useEffect, useState } from "react";
import Header from "../Components/header1"
import { Cookies } from "react-cookie";
import axios from "axios";
import Apiurl from '../Components/Apiurl.js'
import { Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Favs from "../Components/favs_template";
import Loading from "../Components/loading";

export default function Favourites(){
    useEffect(() => {
        document.title = "Favourites - Trendify"
      }, [])
    const navigate=useNavigate()
    const myCookie=new Cookies();
    const username=myCookie.get('username')
    const [favs,setfavs]=useState([]);
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        axios({
            url:Apiurl+'/favs/getfavs',
            method:'GET',
            params:{username}
        })
        .then((res)=>{
            setLoading(false)
            setfavs(res.data.list)
            console.log("Products in Favs : "+res.data.list.length)
        })
    },[])

    return (
    <div className="favsmain">
        {loading? <Loading text="Getting Your Favorite Products..." />
        :<div>
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
        </div>}
    </div>)
}