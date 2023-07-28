import React from 'react';
import ChatBot from 'react-simple-chatbot';
import {Segment} from 'semantic-ui-react';

export default function App(){
  const steps =[
    {
      id:'Greet',
      message:'Hello, Welcome to Trendify',
      trigger: 'Ask Name'
    },
    {
      id:'Ask Name',
      message: 'Please enter your name',
      trigger: 'waiting1'
      
    },
    {
      id:'waiting1',
      user:true,
      trigger:'Name'
    },
    {
      id:'Name',
      message:'Hi {previousValue},Please select while ordering which goods you had your issues',
      trigger:'issues'
    },
    {
      id:'issues',
      options:[
        {value: 'Costumes',label: 'Costumes',trigger: "Costumes" },
        {value: 'Mobiles',label: 'Mobiles',trigger: "Mobiles" },
        {value: 'Laptops',label: 'Laptops',trigger: "Laptops"},
      ],
    },
    {
      id:'Costumes',
      message:'please tell your issue you faced while ordering costumes',
      trigger:'waiting2'
    },
    {
       id:'waiting2',
       user:true,
       trigger:'sol'
    },
    {
      id:'Mobiles',
      message:'Please tell the issue faced while ordering mobiles',
      trigger:'waiting3'
    },
    {
      id:'waiting3',
      user:true,
      trigger:'sol'
    },
    {
      id:'Laptops',
      message:'Please tell the issue faced while ordering Laptops',
      trigger:'waiting4'

    },{
      id:'waiting4',
      user:true,
      trigger:'sol'
    },
    {
      id:'sol',
      message:'OK!!Your issue will be resolved soon',
      end:true
    },
  ];
  return(
      <div className='main'>
        <div>
         <Segment floated="right">
          <ChatBot steps={steps}/>
         </Segment>
         </div>
      </div>
  )
}