import React, { useState } from "react";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import Laptop from '../images/Products/laptop.jpeg';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Button, Hidden } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import Product_display from './products_template';



export default function Card(props){
    const [add,setAdd]=useState(false);
    const [fav,setFav]=useState(false);
    
    function handleChange(){
        setAdd(true);
    }
    
    function handleChangeFav(){
        fav?setFav(false):setFav(true);
    }
    function display(){
        return <Product_display name={props.name} />
    }
    return(
        <div className="card-data">
            <div style={{display:'block'}}>
            <div style={{display:'inline-block'}}>
                <button  onClick={display}>
                    <img src={props.image} alt="" />
                </button>
                
            </div>
            <h3 style={{marginLeft:'10px',width:"160px",overflow:"hidden"}}>{props.name}</h3>
            <CurrencyRupeeRoundedIcon fontSize="very-small" sx={{display:'inline-block',marginLeft:'10px'}}/>
            <span>{props.price}</span>
            <div>
            <LocalOfferRoundedIcon fontSize="very-small" sx={{display:"inline-block",marginLeft:'10px'}} /><span style={{color:'green',fontSize:'small',marginLeft:'10px'}}>{props.discount}% discount</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-around"}}>
                        
                        {add?
                            <IconButton className='buttonn' variant='contained' onClick={handleChange}>
                            <CheckCircleRoundedIcon />
                            </IconButton>:
                            <IconButton className='buttonn' variant='contained' onClick={handleChange}>
                            <AddShoppingCartIcon />
                            </IconButton>
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
            
            
    );
}