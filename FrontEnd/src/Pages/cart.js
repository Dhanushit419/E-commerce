import React, { useState } from "react";
import Header from "../Components/header1";
import { Cookies } from "react-cookie";
import { useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Dialog,DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Swal from 'sweetalert2'
import Apiurl from '../Components/Apiurl.js'
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import {PaymentElement} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
import StripeCheckout from 'react-stripe-checkout';
import Loading from "../Components/loading";

// const stripePromise = loadStripe('pk_test_51NZRPASBIKkbBLStupcXbanKIP1htZLKPh0NDRUyxeMcuEMw4S8dqf6p5f3FLNbLLz3pZoqCyYGTr9W3Dp2rSpVS008byxyHHp');
// const options = {
//     clientSecret: 'pk_test_51NZRPASBIKkbBLStupcXbanKIP1htZLKPh0NDRUyxeMcuEMw4S8dqf6p5f3FLNbLLz3pZoqCyYGTr9W3Dp2rSpVS008byxyHHp',
//   };

export default function Cart(){
    const myCookie=new Cookies;
    const navigate=useNavigate();
    const username=myCookie.get("username");
    const [loading,setLoading]=useState(false)

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
            url:Apiurl+'/cart/deletefromcart',
            method:'POST',
            params:DeleteDetails
        })
        .then((res)=>{
            if(res.data.deleted){
                console.log("deleted")
            }
        })
    }


    const [payment,setPayment]=useState(false)
    
    const Close=()=>{
        setPayment(false)
    }
    const onToken=(token)=>{
        setLoading(true)
        if(token){
            axios({
                url:Apiurl+'/orders/orderitem',
                method:'POST',
                params:OrderDetails
            })
            .then((res)=>{
                if(res.data.ordered){
                    setCart([])
                    localStorage.setItem('cart',JSON.stringify([]))
                    setLoading(false)
                    navigate('/ordersuccess')
    
                }
            })
        }
    }

    const date=new Date().toLocaleDateString("en-IN")

    const OrderDetails={username:username,items:cart,date:date}

    const Order=()=>{
        Swal.fire({
            imageUrl:'https://i.ibb.co/fvdZ0vg/favpng-payment-gateway-e-commerce-payment-system.png',
            title:'Payment Options',
            text:'Total Bill Amount To Pay : '+Total.toString(),
            confirmButtonText:'Cash On Delivery',
            showDenyButton: true,
            denyButtonText:'Other Payment Methods',
            confirmButtonColor:'#1565c0',
            denyButtonColor:'#1565c0'
        }).then((res)=>{
            if(res.isConfirmed){
                setLoading(true)
                axios({
                    url:Apiurl+'/orders/orderitem',
                    method:'POST',
                    params:OrderDetails
                })
                .then(async(res)=>{
                    if(res.data.ordered){
                        setCart([])
                        localStorage.setItem('cart',JSON.stringify([]))
                        setLoading(false)
                        navigate('/ordersuccess')
       
                    }
                })
            }
            else if(res.isDenied){
                setPayment(true)
            }
        })

    }

    return(
        <div className="cart">
            
            {loading?<Loading text="Processing Your Order Request"/>
            :<div>
                <Header /><div className="card-container" >
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
                <td style={{width:'200px'}}>
                <Link to={`/view/productid/${item.id}`}>
                <img src={item.imgurl} className='sample'></img></Link>
                </td>
                <td>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <IconButton id='dec' onClick={()=>{ReduceQuantity(index,item.quantity)}}><IndeterminateCheckBoxOutlinedIcon/></IconButton>
                {item.quantity}
                <IconButton id='increase' onClick={()=>{AddQuantity(index)}}><AddBoxOutlinedIcon/></IconButton>
                </div>
                </td>
                
                <td>{item.price}</td>
                <td><IconButton onClick={()=>{DeleteItem(item.id,index)}}><DeleteIcon /></IconButton></td>

             </tr>
                )
                )}
               
           </tbody> 
           </table>:
           <div style={{display:'block',alignContent:'center',justifyContent:'center'}}><h1>No Products In Cart ! Cart Is Empty</h1><br/>
           <img src="https://cdn.dribbble.com/users/2058104/screenshots/4198771/media/6a0fa7f46ba72d002786d0579f8de1d0.jpg"  style={{height:'200px',borderRadius:'100px',mixBlendMode:'multiply'}} alt="" />
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
                <td>₹ {Total}</td>
                <td>{count>0?<Button variant="contained" onClick={Order}>Order</Button>:
                <Button variant="contained" startIcon={<SentimentVeryDissatisfiedIcon/>} disabled>Order</Button>}</td>
            </tfoot>
             </table>
            
            <Dialog open={payment} onClose={Close}>
                <DialogTitle>Other Payment Methods <IconButton><CloseIcon onClick={Close}/></IconButton></DialogTitle>
                <DialogContent >
                <StripeCheckout
                token={onToken}
                currency="inr"
                name="Payment With Card"
                amount={Total*100}
                stripeKey="pk_test_51NZRPASBIKkbBLStupcXbanKIP1htZLKPh0NDRUyxeMcuEMw4S8dqf6p5f3FLNbLLz3pZoqCyYGTr9W3Dp2rSpVS008byxyHHp"
                />
                    {/* <FormControl>
                    <TextField label="Card Number" placeholder="XXXX XXXX XXXX XXXX" fullWidth/>
                    <TextField label="Expiry Date" placeholder="11 / 23" fullWidth/>
                    <TextField label="CVV" placeholder="XXX" fullWidth/>
                    <p>Select Card type : </p>
                    <RadioGroup row defaultValue="debit" >
                        <FormControlLabel value="debit" label="Debit Card" control={<Radio />}/>
                        <FormControlLabel value="credit" label="Credit Card" control={<Radio />}/>
                    </RadioGroup>
                    <p>Amount to pay : {Total}</p>
                    </FormControl> */}
                </DialogContent>
            </Dialog>

         </div>

                
            {/* <div >
                <h1>Count is : {count}</h1>
                <Button variant="contained" onClick={()=>{navigate("/orderSuccess")}}>Order</Button>
            </div> */}
           { /* <Footer /> */}
           
        </div>
            </div>}
        </div>

    )
}


