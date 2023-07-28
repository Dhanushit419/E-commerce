import express, { response } from "express";
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
    ssl:true,
    connectionTimeoutMillis: 1000000, // connection timeout in milliseconds
    idleTimeoutMillis: 1000000 // idle timeout in milliseconds
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

    const response = {newUser:true,uniqueUsername:false}
   // console.log(response)

    try{ 
        const docs= await conn.query("SELECT * FROM customer where email=$1",[data.email])
        const docs1= await conn.query("SELECT * FROM customer where username=$1",[data.username])

        if(docs.rowCount!=0 && docs1.rowCount!=0 ){
            response.newUser=false
        }
    }
    catch(err){
        console.log("Error in checking the existence : "+err)
    }

    try{ 
        const docs= await conn.query("SELECT * FROM customer where username=$1",[data.username])
        if(docs.rowCount==0){
            response.uniqueUsername=true
        }
    }
    catch(err){
        console.log("Error in checking the unique username : "+err)
    }
    
    
    if(response.newUser &&response.uniqueUsername){
        try{
        await conn.query("INSERT INTO customer(username,email,password,mobile_num,address) VALUES($1,$2,$3,$4,$5);",[data.username,data.email,data.pwd,data.mobile,data.address])
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
    const response={correct:false,wrnpwd:true,newMail:false,username:''}
    response.username=data.username
   // console.log(response)
    try{
        const docs = await conn.query("SELECT password FROM customer WHERE username = $1;", [data.username])
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
        await conn.query("INSERT INTO products(id,name,price,discount,rating,description,highlight1,highlight2,highlight3,imgurl,seller,keywords) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);",[id,data.name,data.price,data.discount,rating,data.description,data.highlight1,data.highlight2,data.highlight3,data.imgurl,data.seller,data.keywords])
        response.added=true
        response.id=id
        response.name=data.name
        console.log("New Product added with id :"+id+" Name : "+data.name)
    }
    catch(err){
        console.log("error in adding product in database : "+err.message);
    }
   // console.log(response)
    res.json(response)
})

//to get the list of products from the database
app.get("/getproductlist",async(req,res)=>{
    var result=[];
    try{
        const docs =await conn.query("select * from products")
      //  console.log(docs)
        docs.rows.forEach( row=>{
            result.push({
                id:row.id,
                name:row.name,
                price:row.price,
                discount:row.discount,
                imgurl:row.imgurl,
                rating:row.rating,
                description:row.description,
                highlight1:row.highlight1,
                highlight2:row.highlight2,
                highlight3:row.highlight3,
                seller:row.seller

            })
        })
        console.log(result.length+" products fetched and loaded to localstorage");
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
    //console.log(data)
    var result=[];
    try{
        if(data.searchTerm!=''){
            const docs =await conn.query('select id,name,price,discount,imgurl from products where keywords like $1',[`%${data.searchTerm}%`]) 
            console.log("SearchTerm : "+data.searchTerm+" Items Found : "+docs.rowCount)
            docs.rows.forEach( row=>{
                result.push({
                    id:row.id,
                    name:row.name,
                    price:row.price,
                    discount:row.discount,
                    imgurl:row.imgurl,

                })
            })
        }
    }
    catch(err){
        console.log("error in searching the products from the database: " + err.message);
    }
    //console.log(result[0])

    res.json({list:result ,count:result.length})
})


//To display the selected item from the database

app.get("/displayitem",async(req,res)=>{
    const data=req.query
    const response={name:'',price:'',discount:'',rating:'',description:'',highlight1:'',highlight2:'',highlight3:'',imgurl:'',seller:''}
    try{
        const docs =await conn.query("select name,price,discount,rating,description,highlight1,highlight2,highlight3,imgurl,seller from products where id=$1",[data.id])
        // console.log(docs)
        
            response.name=docs.rows[0].name,
            response.price=docs.rows[0].price,
            response.discount=docs.rows[0].discount,
            response.rating=docs.rows[0].rating,
            response.description=docs.rows[0].description,
            response.highlight1=docs.rows[0].highlight1,
            response.highlight2=docs.rows[0].highlight2,
            response.highlight3=docs.rows[0].highlight3,
            response.imgurl=docs.rows[0].imgurl,
            response.seller=docs.rows[0].seller
       
        // console.log(response)
    }
    catch(err){
        console.log("error in displaying product from the database: " + err.message);
    }
    res.json(response)

})

//to display cart item of the user

app.get("/cart",async(req,res)=>{
    const data=req.query
    var result=[]
    try{
        const docs=await conn.query("SELECT products.id,products.name,products.price,products.imgurl FROM products JOIN cart ON products.id = cart.id WHERE cart.username = $1",[data.username])
        docs.rows.forEach( row=>{
            result.push({
                id:row.id,
                name:row.name,
                price:row.price,
                imgurl:row.imgurl
            })
        })
        console.log("Cart of user : "+data.username+"fetched and Loaded to localstorage ")
        //console.log(result)
       res.json({list:result,count:docs.rowCount})
       //console.log(result)
    }
    catch(err){
        console.log("error in displaying product from the database: " + err.message);
    }
    
    //console.log(result)
})

//adding to cart

app.post("/addtocart",async(req,res)=>{
    const data=req.query
    const response={added:false}
    try{
        await conn.query("insert into cart values($1,$2)",[data.username,data.id])
        response.added=true
        console.log("Product added to cart of user : "+data.username+" with id :" +data.id)
    }
    catch(err){
        console.log("error in adding product to cart : " + err.message);
    }
    res.json(response)
})

//delete from cart

app.post("/deletefromcart",async(req,res)=>{
    const data=req.query
    //console.log(data)
    const response={deleted:false}
    try{
        await conn.query("delete from cart where username=$1 and id=$2",[data.username,data.id])
        response.deleted=true
        console.log("Product Deleted from cart of user : "+data.username+" with id :" +data.id)
    }
    catch(err){
        console.log("error in adding product to cart : " + err.message);
    }
    res.json(response)
})

//checking cart and fav whether its added or not

// app.post("/checkcart",async(req,res)=>{
//     const data=req.query
//     const response={incart:true,fav:true}
//     try{
//         const docs=await conn.query("select *from cart where username=$1 and id=$2",[data.username,data.id])
//         if(docs.rowCount==0){
//             response.incart=false
//         }
//         const fav=await conn.query("select *from favs where username=$1 and id=$2",[data.username,data.id])
//         if(fav.rowCount==0){
//             response.fav=false
//         }
//     }
//     catch(err){
//         console.log("error in checking product in cart : " + err.message);
//     }
//     res.json(response)
// })

//adding to favourites

app.post("/addtofav",async(req,res)=>{
    const data=req.query
    const response={added:false}
    console.log(data)
    try{
        await conn.query("insert into favs values($1,$2)",[data.username,data.id])
        response.added=true
        console.log("added to fav id : "+data.id)
    }
    catch(err){
        console.log("error in adding product to fav : " + err.message);
    }
    res.json(response)
})

//remove from fav

app.post("/removefromfav",async(req,res)=>{
    const data=req.query
    const response={removed:false}
    try{
        await conn.query("delete from favs where username=$1 and id=$2",[data.username,data.id])
        response.removed=true
        console.log("removed from fav id : "+data.id)
    }
    catch(err){
        console.log("error in removing product from fav : " + err.message);
    }
    res.json(response)
})


//adding review for a product

app.post('/addreview',async(req,res)=>{
    const data=req.query
    //console.log(data)
    try{
        await conn.query("insert into reviews(id,username,review) values($1,$2,$3)",[data.id,data.username,data.review])
        console.log("Review added to product : "+data.id+" by "+data.username)
    }
    catch(err){
        console.log('Error in adding review '+err.message)
    }
})

//fetching all reviews from the db

app.get("/getreviews",async(req,res)=>{
    var result=[];
    try{
        const docs =await conn.query("select * from reviews")
      //  console.log(docs)
        docs.rows.forEach( row=>{
            result.push({
                id:row.id,
                username:row.username,
                review:row.review
            })
        })
        console.log(result.length+" Reviews fetched and loaded to localstorage");
    }
    catch(err){
        console.log("error in getting reviews from the database: "+err.message);
    }
   // console.log("result : "+ result[0])
    res.json({list:result})
})

app.listen(3001,()=>console.log("App is running"));