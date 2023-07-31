import React, { useEffect, useState } from 'react';
import Header from '../Components/header1';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function OrderHistory () {
const navigate=useNavigate()
const myCookie=new Cookies()
const [fecthed,setfetch] = useState(false);
const username=myCookie.get('username')
const [dates,setDates]=useState([])
const [items,setItems]=useState([])
useEffect(()=>{
    axios({
        url:'http://localhost:3001/getorderhistory',
        method:'GET',
        params:{username}
    })
    .then((res)=>{
        setDates(res.data.dates)
        console.log(res.data.dates)
        setItems(res.data.items)
        console.log(res.data.items)
        setfetch(true);
    })
},[])

    return(
        <div className='ordersmain'>
            <div className='h1'>
            <Header />
            </div>
            
            <br></br>
            
            <div className='sh'>
            <h1 className='o'>Order History</h1>
            <br></br>
            <br></br>
            {!fecthed ? <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" alt="" /> : dates.length ===0 ? (
                <div style={{display:'block',alignContent:'center',justifyContent:'center'}}><h1>No Orders ! <SentimentVeryDissatisfiedIcon /></h1><br/>
                <img src="https://cdn.dribbble.com/users/2058104/screenshots/4198771/media/6a0fa7f46ba72d002786d0579f8de1d0.jpg"  style={{height:'200px',borderRadius:'100px',mixBlendMode:'multiply'}} alt="" />
                <Button variant="contained"  startIcon={<ShoppingCartIcon/>} onClick={()=>{navigate("/products")}}>Shop Now</Button>
                </div>
            ):(
                <table>
                    <thead>
                        <tr>
                            <th rowSpan={2}>S.No</th>
                            <th rowSpan={2}>Date</th>
                            <th rowSpan={2}>Total Amount</th>
                            <th colSpan={3} className='sb'>Products</th>
                        </tr>
                        <tr>
                            <th>Name</th><th>Price</th><th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dates.map((date,dateindex)=>(
                                                
                                items.map((item,index)=>{
                                    var count = 0;
                                    var req = -1;
                                    var total=0
                                    items.forEach((i,ind) => {
                                        if (i.date == date.date) {
                                            if (req == -1) {
                                                req = ind;
                                            }
                                            count++;
                                            total+=i.price*i.quantity
                                        } 
                                    })
                                    return (  
                                 item.date == date.date &&
                                    <tr >
                                    {index==req && <td rowSpan={count}>{dateindex+1}</td>}
                                    {index==req && <td rowSpan={count}>{date.date}</td>}
                                    {index==req && <td rowSpan={count} className='sb'>{total}</td>}
                                         <td><p className='prductname' style={{width:'230px',textAlign:'center'}}>{item.name}</p></td>
                                         <td>{item.price}</td>
                                         <td>{item.quantity}</td>
                                    </tr>
                                 
                                )})
                           
                            
                        ))
                        }
                    </tbody>
                </table>
                
            )}

            <p className='p'>Thank you for choosing trendify</p>
            <br/><br/>
            </div>
        </div>
    )
};
export default OrderHistory;