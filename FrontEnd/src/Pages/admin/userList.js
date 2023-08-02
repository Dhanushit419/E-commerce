
import React,{useEffect,useState} from "react";
import axios from 'axios';


export default function Dashboard(){
     const [userlist,setuserlist]=useState([{username:'nantha'}]);
    useEffect(()=>{
        axios({
            url:'http://localhost:3001/admin/userlist',
            method:'GET'
            
        })
        .then((res)=>{
                setuserlist([...res.data.list]);
                 console.log(res.data.list);
                 console.log(userlist)
            })
    
    },[])

    return (
        <div>
            {
              userlist.map((user)=>
                    <h1>{user.username}</h1>)  

            }
        </div>
    );
}

