import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import Product_card from "../Components/product_card";
import axios from 'axios';


export default function(){


    // const [productsList,setProductsList]=useState([]);
    
    // useEffect(()=>{
    //     axios({
    //         url: "http://localhost:3001/getproductlist",
    //         method: "GET"
    //     })
    //     .then((res)=>{
    //         setProductsList(res.data.list)
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })

    // },[])

    const productsList=JSON.parse(localStorage.getItem('productsList'))


    return(
        <div className="product-card" >
            <Header/>
            {
                productsList.map( product =>
                    <Product_card
                    id={product.id}
                    name={product.name} 
                    price={product.price}
                    discount={product.discount}
                    image={product.imgurl}
                    
                    />
                )
            }
            
        </div>
    );
}