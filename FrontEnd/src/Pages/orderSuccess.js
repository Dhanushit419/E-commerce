import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function OrderSuccess(){
    const navigate=useNavigate();
    return(
        <div style={{display:'block',justifyContent:'center',alignItems:'center',height:'70vh'}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'15%'}}>
        <svg className="checkmark" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="38" />
      <path
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M25,40 l10,10 l25,-25"
      />
    </svg>
    <br/><br/>
        </div>
        <br/><br/>
        <div style={{display:'flex',width:'100%',justifyContent:"center",alignItems:'center',flexDirection:'column'}}>
            <h2 className="fade-in-text">Order Placed Successfully ! ❤️</h2>
            <br/>
        <Button variant="filled" sx={{color:'green',outline:'green'}} onClick={()=>{navigate("/orders")}} >Go to Orders</Button>
        </div>
    </div>
        
    )
}