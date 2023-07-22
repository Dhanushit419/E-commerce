import React, { useState } from "react";
import Header from "../Components/header1";
import Footer from "../Components/footer";
import { Cookies } from "react-cookie";
import { useEffect } from "react";
import axios from "axios";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';


export default function Cart(){
    const myCookie=new Cookies;
    const navigate=useNavigate();
    const username=myCookie.get("username");

   
    const cartItems=JSON.parse(localStorage.getItem('cart'));
    console.log(cartItems)
    const [cart,setCart]=useState(cartItems);
    const count=cart.length;

    useEffect(()=>{
        calculateTotal();
    },cart)

    const [Quantity,setQuantity]=useState(1);
    const [Total,setTotal]=useState(0);

    const calculateTotal = () => {
        const totalPrice = cart.reduce((accumulator, item) => accumulator + (item.quantity*item.price), 0);
        setTotal(totalPrice);
      };
    
    const AddQuantity=(index)=>{
        cart[index].quantity+=1;
        localStorage.setItem('cart',JSON.stringify(cart))
        setCart([...cart]);
        calculateTotal()

    }

    const ReduceQuantity=(index,quantity)=>{
        if(quantity>1){
            cart[index].quantity-=1;
            localStorage.setItem('cart',JSON.stringify(cart))
            setCart([...cart]);
            calculateTotal()
        }
    }

    const DeleteItem=(id,index)=>{
        //changing in local storage
        const temp=cart.splice(index,1);
        setCart([...cart]);
        localStorage.setItem('cart',JSON.stringify(cart))
        calculateTotal()
        //to change in db
        const DeleteDetails={username:username,id:id}
        axios({
            url:'http://localhost:3001/deletefromcart',
            method:'POST',
            params:DeleteDetails
        })
        .then((res)=>{

        })
    }

    return(
        <div className="cart">
            <Header />
            <div className="card-container" >
            <div className='cartcard'>
            
            {count>0?<table style={{alignContent:"flex-start"}}>
               <thead>
               <tr>
                   <th>Product Id</th>
                   <th> Product Name</th>
                   <th style={{paddingLeft:'80px'}}>Image</th>
                   <th>Quantity</th>
                   <th>Product Price</th>
                   <th>Remove from Cart</th>
               </tr>
               </thead>

           <tbody>
               
                {cart.map((item,index)=> (
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td style={{width:'200px'}}><img src={item.imgurl} className='sample'></img></td>
                <td style={{display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
                <IconButton id='dec' onClick={()=>{ReduceQuantity(index,item.quantity)}}><IndeterminateCheckBoxOutlinedIcon/></IconButton>
                {item.quantity}
                <IconButton id='increase' onClick={()=>{AddQuantity(index)}}><AddBoxOutlinedIcon/></IconButton></td>
                
                <td>{item.price}</td>
                <td><IconButton onClick={()=>{DeleteItem(item.id,index)}}><DeleteIcon /></IconButton></td>

             </tr>
                )
                )}
               
           </tbody> 
           </table>:<div style={{display:'block',alignContent:'center',justifyContent:'center'}}><h1>No Products In Cart ! Cart Is Empty</h1><br/>
           <img src="https://cdn.dribbble.com/users/2058104/screenshots/4198771/media/6a0fa7f46ba72d002786d0579f8de1d0.jpg"  style={{height:'200px',borderRadius:'100px'}} alt="" />
           <Button variant="contained"  startIcon={<ShoppingCartIcon/>} onClick={()=>{navigate("/products")}}>Shop Now</Button>
           </div>}
            </div>
                
            
        <div className='cartcard2'>
             <table style={{alignContent:"flex-start"}}>
                <thead>
                    <th>Order Summary</th>
                </thead>

            <tbody>
                <tr>
                   <td>Total.No of Items in Cart  : </td> {count>0?<td>{count}</td>:<td>Cart Is Empty</td>}
                </tr>
                <tr>
                    <th>Name</th><th>Quantity</th><th>Price</th>
                </tr> 
                {
                    cart.map((item)=>(
                    <tr>
                    <td>{item.name}</td><td>{item.quantity}</td><td>{item.price}</td>
                    </tr>
                    ))
                }
                
            </tbody>
            <tfoot>
                <td><em>Total Price </em></td>
                <td>{Total}</td>
                <td>{count>0?<Button variant="contained" onClick={()=>{navigate("/orderSuccess")}}>Order</Button>:
                <Button variant="contained" startIcon={<SentimentVeryDissatisfiedIcon/>} disabled>Order</Button>}</td>
            </tfoot>
             </table>

         </div>

                
            {/* <div >
                <h1>Count is : {count}</h1>
                <Button variant="contained" onClick={()=>{navigate("/orderSuccess")}}>Order</Button>
            </div> */}
           { /* <Footer /> */}
           
        </div>
        </div>

    )
}


