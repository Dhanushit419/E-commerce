import React, { useState,useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from "@mui/material"
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";
import Apiurl from '../../Components/Apiurl.js'

// const Tabledata = (props) => {
//     const [display1, setdisplay1] = useState(false);
//     const [stockValue, setStockValue] = useState(0);
//     const onchange = () => {
//         setdisplay1(true);
//     }
//     const onAddStock = () => {
//         props.onStockChange(props.index, stockValue);
//         setStockValue(0);
//         setdisplay1(false);
//       };
//     return (

//     )
// }

export default function Dashboard() {
    useEffect(() => {
        document.title = "Products List - Trendify"
    }, [])

    const navigate = useNavigate()
    const myCookie = new Cookies
    const ProductList = JSON.parse(localStorage.getItem('productsList'))
    const [list, setList] = useState(ProductList)
    const namesArray = list.map(element => element.name);
    console.log(namesArray)
    const [display1, setdisplay1] = useState(false);
    const [stockValue, setStockValue] = useState(0);
    const onchange = () => {
        setdisplay1(true);
    }

    const handleStockChange = (index, newStockValue,id) => {
        const updatedList = [...list];
        updatedList[index].stock += newStockValue;
        setList(updatedList);
        localStorage.setItem('productsList', JSON.stringify(updatedList))
        setdisplay1(false);
        axios({
            url:Apiurl +'/products/addstock',
            method:'POST',
            params:{id,newStockValue}
        })
        .then((res)=>{

        })
    };
    const Logout = () => {
        myCookie.remove('admin')
        navigate('/adminlogin')
    }
    const data = [
        { name: 'Hairband', sold: 4000, amt: 24000, imgsrc: "https://m.media-amazon.com/images/I/81IG62hC1oL._AC_UF1000,1000_QL80_.jpg" },
        { name: 'Laptop', sold: 3000, amt: 22100, imgsrc: "https://m.media-amazon.com/images/I/91oF9q-jE5L.jpg" },
        { name: 'Costumes', sold: 600, amt: 23000, imgsrc: "https://m.media-amazon.com/images/I/91oF9q-jE5L.jpg" },
        { name: 'Shoes', sold: 3000, amt: 21000, imgsrc: "https://m.media-amazon.com/images/I/91oF9q-jE5L.jpg" },
    ];

    return (
        <div className='plmain' style={{ backgroundColor: 'whitesmoke' }}>
            <div className='plmain2'>
                <Button variant="contained" onClick={() => { navigate("/dashboard") }}>Dashboard</Button>
                <Button variant="contained" onClick={Logout}>Logout</Button>
            </div>
            <br></br>
            <br></br>
            <div className="plmain3">
                <h1>List of Products in TrenDify</h1>
                <br></br>

            </div>
            <br></br>
            <div className="plmain4">
                <p >No of products: {list?.length}</p>
            </div>
            <br></br>
            <br></br>
            <div id='pltable'>
                <table className="table">
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className="columnname">
                            <td>S.no</td>
                            <td>Product ID</td>
                            <td>Product Name</td>
                            <td>image</td>
                            <td>price</td>
                            <td>In stock?</td>
                            <td>Add stock</td>
                        </tr>
                        <div></div>
                        {list.map((i, index) => {
                            return (
                                <tr className="widthincrease">
                                    <td>{index + 1}</td>
                                    <td>{i.id}</td>
                                    <td>{i.name}</td>
                                    <td><img src={i.imgurl} height={70} /></td>
                                    <td>{i.price}</td>
                                    <td>{i.stock}</td>
                                    <td >

                                        {
                                            display1 ?
                                                <div>
                                                    <TextField size="small" type="number" sx={{ width: '60px' }} onChange={(e) => setStockValue(parseInt(e.target.value))} ></TextField>
                                                    <Button onClick={() => { handleStockChange(index, stockValue,i.id) }} >Add</Button></div>
                                                : <Button variant="outlined" onClick={onchange}>Add stock</Button>
                                        }
                                    </td>
                                </tr>)
                        })}


                    </tbody>

                </table>

            </div>

            <br></br>
            <div className="chart">
                <LineChart width={300} height={300} data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sold" stroke="#8884d8" />
                    <Line type="monotone" dataKey="amt" stroke="#8884d8" />
                    {/* Add more Line components for additional lines */}
                </LineChart>
            </div>



        </div>
    );
};