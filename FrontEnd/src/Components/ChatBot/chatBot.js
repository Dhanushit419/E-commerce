import React from 'react';
import ChatBot from 'react-simple-chatbot';
import {Segment} from 'semantic-ui-react';
import { Cookies } from 'react-cookie';
import { useState, useEffect} from 'react';
import axios from 'axios';

export default function App(){
  
  const myCookie = new Cookies();
  const username = myCookie.get("username");
  
  const products = JSON.parse(localStorage.getItem("productsList"));
  const RedirectComponent = () => {
    // Custom component to handle redirection logic
    window.location.href = 'http://localhost:3000/orders';
    return null;
  }

const [searchTerm, setSearchTerm] = useState('');

const [items, setItems] = useState([]);

  useEffect(() => {
    axios({
        url: 'http://localhost:3001/orders/getorderhistory',
        method: 'GET',
        params: { username }
    })
        .then((res) => {
            res.data.items.forEach(element => {
              element.trigger = "p1";
              element.label = element.name;
              element.value = element.name;
            });
            setItems([...res.data.items])
            console.log("gooott");
            console.log(res.data.items)
            console.log(items)
            
        })
},[])


  const steps =[
    {
      id:'Greet',
      message:`Hi ${username}! Welcome to Trendify!`,
      trigger: 'intro'
    },
    {
      id:'intro',
      message: 'I am your Trendify Chatbot here!',
      trigger: 'waiting1'
      
    },
    {
      id:'waiting1',
      message: 'How can I help you?',
      trigger: 'waiting'
    },
    {
      id:'waiting',
      options:[
        {value:'history',label:'Get my Order History',trigger:"history"},
        {value:'search',label:'Search for an item',trigger:"search"},
        {value:'Name',label:'Having issue with an item',trigger:"Name"},
        {value:'Contact',label:'Contact us',trigger:"Contact"}
        
      ],
    },
    {
      id:"Contact",
      component: (
        <div>
          Dhanushkumar Sankar - 9025635359 <br />
          Aathithyan Maariraj - 7338997851 <br />
          Shashi SB           - 8925064607
        </div>
      ),      trigger:'g1',
    },
    {
      id: 'history',
      message: 'Redirecting you to orders...',
      trigger: 'performRedirect',
    },

    {
      id: 'redirectMessage',
      message: 'Redirecting you to orders...',
      trigger:'performRedirect',
    },
    {
      id: 'performRedirect',
      component: <RedirectComponent />, 
      end: true,
    },

    {
      id: 'search',
      message: 'Please enter the name of the product you want to search for:',
      trigger: 'collectProductName',
    },
    {
      id: 'collectProductName',
      user: true,
      trigger: 'redirectBasedOnProductName',
    },
    {
      id: 'redirectBasedOnProductName',
      message: ({ previousValue }) => {
        const searchTerm = previousValue || ''; 
    
        const matchingProducts = products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        if (matchingProducts.length === 0) {
          return `No results found for '${searchTerm}'.`;
        }

        const productUrl = `http://localhost:3000/products?name=${searchTerm}`;
        window.location.href = productUrl;
        return null; 
      },
      trigger:'search'
    },
    {
      id:'Name',
      message:'It seems you have ordered the follwing items: ',
      trigger:'oh',
    },
    {
      id: 'oh',
      //message:'hi',

      options:items,
      // <OrderedItems item={items} />
      // component:,
     // message: items.map(item => item.productName), // Format items as a string
      // trigger:'sol2',
    },
    {
      id:'p1',
      message:({previousValue}) => 'Please share your issue about the '  + previousValue + ' that you have ordered!',
      trigger:'next1',
    },
    {
      id:"next1",
      user:true,
      trigger:"sol"
    },
    {
      id:'sol',
      message: ({ previousValue }) => {
        
        return "Ok your issue will be solved soon"; 
      },
      trigger:"g1"
      // end:true
    },
    {
        id:"g1",
        options:[
          {value:"go back", label:"go back to helping menu", trigger:"waiting"}
        ]
    },
  ];

  const handleEnd = ({ steps, values }) => {
    if (values.redirect) {
      window.location.href = 'http://localhost:3000/orders';
    }
  };

  return(
      // <div className='main'>
        <div className='checking1'>
         <Segment floated="right">
          {items.length > 0 && <ChatBot floating={true} steps={steps} handleEnd={handleEnd}/>}
         </Segment>
         </div>
      // </div>
  )
}