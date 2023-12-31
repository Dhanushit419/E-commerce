import React, { useEffect, useState } from "react";
import Product from "../Components/products_template";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Apiurl from '../Components/Apiurl.js'

export default function Display(){
    const {id} =useParams();
    console.log("product Id : "+id)
    const productsList=JSON.parse(localStorage.getItem('productsList'))
    //console.log(productsList)
    const DisplayItem = productsList.filter((item) => item.id == id)[0];
    console.log(DisplayItem)
    useEffect(() => {
        document.title = DisplayItem.name+" - Trendify"
      }, [])

    // const [productDetails,setProductDetails] =useState({name:'',price:'',discount:'',rating:'',description:'',highlight1:'',highlight2:'',highlight3:'',imgurl:'',seller:''});

    // useEffect(()=>{
    //     axios({
    //         url: Apiurl+"/products/displayitem",
    //         method: "get",
    //         params: {id}
    //     })
    //     .then((res)=>{
    //         setProductDetails(res.data);
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })

    // },[])




    return (
        <div>
            <Product 
                id={id}
                name={DisplayItem.name}
                image={DisplayItem.imgurl}  
                price={DisplayItem.price}
                rating={DisplayItem.rating}
                discount={DisplayItem.discount}
                desc={DisplayItem.description}
                highlight1={DisplayItem.highlight1}
                highlight2={DisplayItem.highlight2}
                highlight3={DisplayItem.highlight3}
                seller={DisplayItem.seller}
                stock={DisplayItem.stock}
            />
        </div>
    );
}