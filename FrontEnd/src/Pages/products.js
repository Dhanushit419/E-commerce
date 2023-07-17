import React, { useState } from "react";
import Header from "../Components/header";
import Product_card from "../Components/product_card";
import Product_list from  '../Components/productsList'



export default function(){


    return(
        <div className="product-card" >
            <Header/>
            {
                Product_list.map( product =>
                    <Product_card
                    name={product.name} 
                    price={product.price}
                    discount={product.discount}
                    image={product.image}
                    
                    />
                )
            }
            
        </div>
    );
}