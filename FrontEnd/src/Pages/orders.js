import React from 'react';
import Header from '../Components/header1';
import orderHistoryData from '../Components/history';

function orderHistory () {
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
            {orderHistoryData.length ===0 ? (
                <p>No orders</p>
            ):(
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Items delievered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderHistoryData.map((order)=>(
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.date}</td>
                                <td>{order.total}</td>
                                <td>{order.status}</td>
                                <td>
                               <div className='final'>   
                              <ul >
                                {order.items.map((item)=>(
                                    <li key={item.id}>
                                        <p>{item.name}</p>
                                        <p>Price: Rs.{item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                    </li>
                                ))}
                              </ul>
                              </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            )}

            <p className='p'>Thank you for choosing trendify</p>
            </div>
        </div>
    )
};
export default orderHistory;