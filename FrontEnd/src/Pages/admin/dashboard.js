import React, { useEffect, useState } from "react";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import axios from "axios";
import { Cookies } from "react-cookie";
import {useNavigate} from 'react-router-dom'
import { LineChart, Line, CartesianGrid, XAxis, YAxis ,Tooltip} from 'recharts';
import { Button } from "@mui/material";
import Loading from "../../Components/loading";
import Apiurl from '../../Components/Apiurl.js'

export default function Dashboard(){
    const myCookie=new Cookies
    const adminname=myCookie.get('admin')
    if(adminname==''){
        adminname='temp'
    }
    const navigate=useNavigate()

    const [loading,setLoading]=useState(true)
    const [admin,verifyAdmin]=useState(false)
    const [Revenue,setRevenue]=useState([])
    const [productCount,setProductCount]=useState(0)
    const [userCount,setUserCount]=useState(0)
    const [stock,setStock]=useState(0)
    const [totalRevenue,setTotalRevenue]=useState(0)
    const [imgurl,setImgurl]=useState('')

    useEffect(()=>{
        axios({
            url:{Apiurl}+'/admin/dashboard',
            method:'GET',
            params:{adminname}
        })
        .then((res)=>{
            setLoading(false)
            if(res.data.admin){
                
                console.log(res.data)
                verifyAdmin(true);
                setRevenue(res.data.revenue)
               // console.log(res.data.revenue)
               setProductCount(res.data.products)
               setUserCount(res.data.users)
               setStock(res.data.stock)
               setTotalRevenue(res.data.completerevenue)
               setImgurl(res.data.img)

            }
        })
        
    },[])

    const Logout =()=>{
        myCookie.remove('admin')
        navigate('/adminlogin')
    }
    const maxRevenue = Math.max(...Revenue.map(entry => entry.revenue));
    const maxProductsPurchased = Math.max(...Revenue.map(entry => entry.ProductsPurchased));

    return(
        <div>
            {loading? <Loading text="Verifying..."/>

            :admin?
                <div style={{display:"flex",backgroundColor:'aliceblue',height:'100vh'}}>
                <div className="db-left">
                    <div className="db-left-child">
                    <div style={{display:'flex',justifyContent:"center",alignItems:'center',flexDirection:'column',rowGap:'20px'}}>
                    <img src={imgurl} style={{height:"200px",width:"200px",borderRadius:'100px'}} alt="" />
                    <h2 style={{color:"whitesmoke",fontSize:'30px'}}>ADMIN</h2>
                    <p style={{color:'whitesmoke',fontSize:'35px'}}>{adminname}</p>

                    </div>
                    <Button style={{minHeight: '50px',fontSize:'20px'}} variant="contained" onClick={Logout}>Logout</Button>

                    </div>
                </div>
                <div className="db-right">
                    <div style={{height:'100px',backgroundColor:'whitesmoke', boxShadow:' 0 8px 6px -6px black',width:"100%",display:'flex',justifyContent:'center',alignItems:"center"}}>
                            <h1 style={{fontFamily:'monospace',color:'#253544',fontSize:'70px'}}>Admin Dashboard</h1>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                        <div className="db-card" onClick={()=>navigate('/productlist')}>
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',columnGap:'20px'}}>
                                 <p style={{fontSize:'45px'}}>{productCount}</p>
                                 <p style={{fontFamily:'sans-serif'}}>Products</p>
                            </div>
                        </div>
                        <div className="db-card" onClick={()=>navigate('/userlist')}>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',columnGap:'20px'}}>
                                 <p style={{fontSize:'45px'}}>{userCount}</p>
                                 <p style={{fontFamily:'sans-serif'}}>Happy customers</p>
                            </div>
                        </div>
                        <div className="db-card" onClick={()=>navigate('/revenue')}>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',columnGap:'20px'}}>
                                 <p><CurrencyRupeeIcon fontSize="large"/><span style={{fontSize:'45px'}}>{totalRevenue}</span></p>
                                 <p style={{fontFamily:'sans-serif'}}>Revenue</p>
                            </div>
                        </div>
                        <div className="db-card" onClick={()=>navigate('/addproduct')}>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',columnGap:'20px'}}>
                                 <p style={{fontSize:'45px'}}>{stock}</p>
                                 <p style={{fontFamily:'sans-serif'}}>InStock</p>
                                 <p style={{fontFamily:'sans-serif'}}>Click here to Add Product</p>
                            </div>
                        </div>
                    </div>
                    <div className="db-graphs">
                    <LineChart width={500} height={420} data={Revenue} margin={{ top: 20, right: 30, bottom: 40, left: 50 }}>
                    <Line type="monotone" dataKey="revenue" stroke="#253544" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" label={{ value: 'Date', angle: -45, position: 'insideBottom', dy: 10 }} tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, maxRevenue]}  label={{ value: 'Revenue', angle: -90, position: 'insideLeft', dx: -20 }} />
                    <Tooltip />
                    </LineChart>

                    <LineChart width={500} height={420} data={Revenue} margin={{ top: 20, right: 30, bottom: 40, left: 50 }}>
                    <Line type="monotone" dataKey="ProductsPurchased" stroke="#ff7300" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" label={{ value: 'Date', angle: -45, position: 'insideBottom', dy: 10 }} tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, maxProductsPurchased]} label={{ value: 'Products Purchased', angle: -90, position: 'insideLeft', dx: -20 }} />
                    <Tooltip />
                    </LineChart>

                        {/* <div className="db-paths-sub">
                        <div className="db-path-button">
    
                        </div>
                        <div className="db-path-button">
    
                        </div>
                        </div>
                        <div className="db-paths-sub">
                        <div className="db-path-button">
    
                        </div>
                        <div className="db-path-button">
    
                        </div>
                        </div> */}
                    </div>
                </div>
            </div>:
            // if not admin
            <div style={{display:'flex',height:'100vh',width:'100%',justifyContent:'center',alignItems:'center'}}>
                <h1>Restricted ! </h1>
                <h2>Only Admins</h2>
            </div>
            }
        </div>
    )
}

