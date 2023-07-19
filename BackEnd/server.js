import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import http from "http";
import cors from "cors";

const app = express();
app.use(bodyParser.urlencoded({extended:true})); 
app.use(cors());

//DataBase Connection
// postgres://dhanush:JGja9Qb4Tego@ep-morning-darkness-421488.us-east-2.aws.neon.tech/neondb

const PGHOST='ep-morning-darkness-421488.us-east-2.aws.neon.tech'
const PGDATABASE='neondb'
const PGUSER='dhanush'
const PGPASSWORD='JGja9Qb4Tego'
const PGPORT='5432'
const ENDPOINT_ID='E-commerce Website'

var conn =new pg.Client({
    user:PGUSER,
    password:PGPASSWORD,
    database:PGDATABASE,
    port:PGPORT,
    host:PGHOST,
    ssl:true
});

//checking connectivity

conn.connect((err)=>{
    if(!err)console.log("Connected to db")
    else console.log("Eror : "+err.message)
})

//sign up form - new user registration

app.post("/register",async(req,res)=>{
    const data=req.query
    console.log(data)

    const response = {newUser:true}
    console.log(response)
    try{ 
        const docs= await conn.query("SELECT * FROM customer where email=$1",[data.email])
        if(docs.rowCount!=0){
            response.newUser=false
        }
    }
    catch(err){
        console.log("Error in checking the existence : "+err)
    }
    
    if(response.newUser){
        try{
        await conn.query("INSERT INTO customer(name,email,password,mobile_num) VALUES($1,$2,$3,$4);",[data.name,data.email,data.pwd,data.mobile])
        }
        catch(err){
            console.log("Error in registration of new user : "+err)
        }
    }
    
    console.log(response)
    res.json(response)
})




//Login page verification

app.post("/login",async(req,res)=>{
    const data=req.query
    console.log(data)
    const response={correct:false,wrnpwd:true,newMail:false,username:'asdf'}
    console.log(response)
    try{
        const docs = await conn.query("SELECT name, password FROM customer WHERE email = $1;", [data.email])
        if(docs.rowCount == 0){
            response.newMail =true
        }
        else{
            if(docs.rows[0].password === data.pwd){
                response.correct = true
                response.wrnpwd = false
            }
            else{
                response.wrnpwd =true
            }
        }
        console.log(response)
        res.json(response)
    }
    catch(err){
        console.log("error in checking db : "+err.message);
    }

})


//adding product into database

app.post("/addproduct",async(req,res)=>{
    const data=req.query
    console.log(data)
    const response ={name:'',added:false,id:''}
    try{  
        //to get the id of the product 
        const count =await conn.query("select * from products")
        const id=count.rowCount+1
        const rating =5
        console.log(id)
        await conn.query("INSERT INTO products(id,name,price,discount,rating,description,highlight1,highlight2,highlight3,imgurl,seller) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);",[id,data.name,data.price,data.discount,rating,data.description,data.highlight1,data.highlight2,data.highlight3,data.imgurl,data.seller])
        response.added=true
        response.id=id
        response.name=data.name
    }
    catch(err){
        console.log("error in adding product in database : "+err.message);
    }
    console.log(response)
    res.json(response)
})
//to get the list of products from the database
app.get("/getproductlist",async(req,res)=>{
    var result=[];
    try{
        const docs =await conn.query("select id,name,price,discount,imgurl from products")
      //  console.log(docs)
        docs.rows.forEach( row=>{
            result.push({
                id:row.id,
                name:row.name,
                price:row.price,
                discount:row.discount,
                imgurl:row.imgurl
            })
        })
    }
    catch(err){
        console.log("error in listing the products from the database: "+err.message);
    }
   // console.log("result : "+ result[0])
    res.json({list:result})
})


//to get the searched result from database

app.get("/search",async(req,res)=>{
    const data=req.query
    console.log(data)
    var result=[];
    try{
        if(data.searchTerm!=''){
            const docs =await conn.query('select id,name,price,discount,imgurl from products where description like $1',[`%${data.searchTerm}%`]) 
            console.log(docs.rowCount)
            docs.rows.forEach( row=>{
                result.push({
                    id:row.id,
                    name:row.name,
                    price:row.price,
                    discount:row.discount,
                    imgurl:row.imgurl
                })
            })
        }
    }
    catch(err){
        console.log("error in searching the products from the database: " + err.message);
    }
    console.log(result[0])

    res.json({list:result ,count:result.length})
})

app.listen(3001,()=>console.log("App is running"));