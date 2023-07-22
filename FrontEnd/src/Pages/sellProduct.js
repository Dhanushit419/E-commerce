import React from "react";
import { useState } from "react";
import axios from "axios";
import Header from "../Components/header1";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";


export default function Sell(){
    const[productDetails,setProductDetails]=useState({name:'',price:0,discount:0,description:'',highlight1:'',highlight2:'',highlight3:'',imgurl:'',seller:'',keywords:''});

    function  UpdateInfo(e){
    setProductDetails({...productDetails,[e.target.id]:e.target.value})
    }

    const addProduct =() =>{
        const list=JSON.parse(localStorage.getItem('productsList'));
        list.push(productDetails)
        localStorage.setItem('productsList',JSON.stringify(list))

        axios({
            url:"http://localhost:3001/addproduct",
            method:"POST",
            params:productDetails
        })
        .then((res)=>{
            if(res.data.added){
                alert(res.data.name+" Added Succesfully with id = " + res.data.id)
                window.location.reload();
            }
            else{
                alert("Error in adding Your Product !")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div className="sell">
            <Header />
        <div className="main">
            <div className="submain">
                <div >
                <h1 >Sell Your Products In TrenDify! 🤝</h1>
                <br/><br/>
                <div className="text-field">
                <TextField id="name"   onChange={UpdateInfo} aria-valuetext={productDetails.name} label='Name of the Product' type="text" fullWidth />
                </div>
                <div className="text-field">
                <TextField id="price" onChange={UpdateInfo} aria-valuetext={productDetails.price} label='Price of the Product' type="number" fullWidth/>
                </div>                
                <div className="text-field">
                <TextField id="discount" onChange={UpdateInfo} aria-valuetext={productDetails.discount} label='Disount Percentage' type="number" fullWidth/>
                </div>
                <div className="text-field">
                <TextField id="description" onChange={UpdateInfo} aria-valuetext={productDetails.description} label='Description of the Product' type="text" multiline minRows={4} fullWidth/>
                </div>
                <div className="text-field">
                <TextField id="highlight1" onChange={UpdateInfo} aria-valuetext={productDetails.highlight1} label='Highlight of the product - 1' type="text" fullWidth/>
                </div>
                <div className="text-field">
                <TextField id="highlight2" onChange={UpdateInfo} aria-valuetext={productDetails.highlight2} label='Highlight of the product - 2' type="text" fullWidth/>
                </div>
                <div className="text-field">
                <TextField id="highlight3" onChange={UpdateInfo} aria-valuetext={productDetails.highlight3} label='Highlight of the product - 3' type="text" fullWidth/>
                </div>
                <div className="text-field">
                <TextField id="seller" onChange={UpdateInfo} aria-valuetext={productDetails.seller} label='Name of the Seller' type="text" fullWidth/>
                </div>
                <div className="text-field">
                <TextField id="imgurl" onChange={UpdateInfo} aria-valuetext={productDetails.imgurl} label='Image Url of the Product' type="text" fullWidth />
                </div>
                <div className="text-field">
                <TextField id="keywords" onChange={UpdateInfo} aria-valuetext={productDetails.keywords} defaultValue="keywords... " label='Keywords' type="text" fullWidth />
                </div>

                <Button variant="contained" onClick={addProduct}>Add Product</Button>

                </div>
            </div>
        </div>
        </div>

    )





}