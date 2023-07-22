import React from "react";
import { Link } from "react-router-dom";


export default function Card(props){
    return(
   
      <Link to={`/view/productid/${props.id}`}>
            <div className="card">
      <img src={props.img} alt={props.name}/>
        
        <div className="intro">
         <h2>{props.name}</h2>
         <p>{props.content}</p>
         <p>Just @ {props.price}</p>  
        </div>
      </div>
       </Link>
  
  
    );
  }
  
