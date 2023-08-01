import React, { useEffect } from "react";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import axios from "axios";

export default function Dashboard(){

    useEffect(()=>{},[])
    return(
        <div style={{display:"flex",backgroundColor:'aliceblue',height:'100vh'}}>
            <div className="db-left">
                
            </div>
            <div className="db-right">
                <div style={{height:'100px',backgroundColor:'whitesmoke', boxShadow:' 0 8px 6px -6px black',width:"1050px",display:'flex',justifyContent:'center',alignItems:"center"}}>
                        <h1 style={{fontFamily:'monospace',color:'#253544',fontSize:'70px'}}>Admin Dashboard</h1>
                </div>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                    <div className="db-card">
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',columnGap:'20px'}}>
                             <p style={{fontSize:'45px'}}>80</p>
                             <p style={{fontFamily:'sans-serif'}}>Products</p>
                        </div>
                    </div>
                    <div className="db-card">
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',columnGap:'20px'}}>
                             <p style={{fontSize:'45px'}}>25</p>
                             <p style={{fontFamily:'sans-serif'}}>Happy customers</p>
                        </div>
                    </div>
                    <div className="db-card">
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',columnGap:'20px'}}>
                             <p><CurrencyRupeeIcon fontSize="large"/><span style={{fontSize:'45px'}}>230000</span></p>
                             <p style={{fontFamily:'sans-serif'}}>Revenue</p>
                        </div>
                    </div>
                    <div className="db-card">
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',columnGap:'20px'}}>
                             <p style={{fontSize:'45px'}}>2000</p>
                             <p style={{fontFamily:'sans-serif'}}>InStock</p>
                        </div>
                    </div>
                </div>
                <div className="db-paths">
                    <div className="db-paths-sub">
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
                    </div>
                </div>
            </div>
        </div>
    )
}