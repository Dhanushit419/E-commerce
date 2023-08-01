import React from "react";
import { useState } from "react";
import axios from "axios";
import Header from "../../Components/header1";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function AddProduct(){
    const navigate=useNavigate()
    const[productDetails,setProductDetails]=useState({name:'',price:0,discount:0,description:'',highlight1:'',highlight2:'',highlight3:'',imgurl:'',seller:'Trendify Products Limited...',keywords:'',stock:0});

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
            <div style={{display:'flex',justifyContent:'flex-end',padding:'20px',columnGap:'30px'}}>
            <Button variant="contained" onClick={()=>{navigate('/dashboard')}} >Dashboard</Button>
            <Button variant="contained" >Logout</Button>
            </div>
        <div className="main">
            <div className="submain">
                <div >
                <h1 >Add Product To Database 📅</h1>
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
                <TextField id="imgurl" onChange={UpdateInfo} aria-valuetext={productDetails.imgurl} label='Image Url of the Product' type="text" fullWidth />
                </div>
                <div className="text-field">
                <TextField id="keywords" onChange={UpdateInfo} aria-valuetext={productDetails.keywords} defaultValue="keywords... " label='Keywords' type="text" fullWidth />
                </div>
                <div className="text-field">
                <TextField id="stock" onChange={UpdateInfo} aria-valuetext={productDetails.stock}  label='Stock Count' type="number" fullWidth />
                </div>

                <Button variant="contained" onClick={addProduct}>Add Product</Button>

                </div>
            </div>
        </div>
        </div>

    )





}