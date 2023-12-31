import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import Product_card from "../Components/product_card";

import ChatBot from '../Components/ChatBot/chatBot';


export default function(){

    useEffect(() => {
        document.title = "Products - Trendify"
      }, [])

    // const [productsList,setProductsList]=useState([]);
    
    // useEffect(()=>{
    //     axios({
    //         url: Apiurl+"/products/getproductlist",
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
        <div>
            
        <div className="product-card" >
                {/* <ChatBot/> */}

                <Header/>
                {
                    productsList.map( product =>
                        <Product_card
                        id={product.id}
                        name={product.name} 
                        price={product.price}
                        discount={product.discount}
                        image={product.imgurl}
                         stock={product.stock}
                        />
                    )
                }
                
            </div>
        </div>
    );
}