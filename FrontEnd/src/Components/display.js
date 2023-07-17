import React from "react";
import Product from "./products_template";
const costumeSet = [
    {name: "versatileDesign: Two traditional outfits in one"},
     {name:" multipurposeUsage: Suitable for various occasions"},
  {    name:"easyWashability: Convenient and easy to clean"} ,
  {name: "versatileDesign: Two traditional outfits in one"},
  {name:" multipurposeUsage: Suitable for various occasions"},
  {    name:"easyWashability: Convenient and easy to clean"} ,  {name: "versatileDesign: Two traditional outfits in one"},
  {name:" multipurposeUsage: Suitable for various occasions"},
  {    name:"easyWashability: Convenient and easy to clean"} 
   ];

export default function Display(){
    return(

        <Product name="Naatu Saraku - Lemon Bacardi Brand uh.." 
        image='https://mydukaan-prod-new.s3.amazonaws.com/214913/e176b5e8-7fac-495e-8925-8b6c615ccba6.png'   
        price='999'
        discount='95'
        desc=""
        high={costumeSet}

        />
    )
}