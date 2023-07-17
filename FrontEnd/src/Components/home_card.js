import React from "react";


export default function Card(props){
    return(
   
      <a href={props.path}>
            <div className="card">
    <img src={props.img} alt={props.name}/>
        
        <div className="intro">
         <h2>{props.name}</h2>
         <p>{props.content}</p>  
        </div>
      </div>
       </a>
  
  
    );
  }
  
