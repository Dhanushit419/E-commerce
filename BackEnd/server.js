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
const docs=  await conn.query("select name,password from customer where email ='dhanush123@gmail.com'");
console.log(docs);

//Login page verification

app.post("/login",async(req,res)=>{
    const data=req.query
    console.log(data)
    const response={correct:false,wrnpwd:true,newMail:false}
    console.log(response)
    try{
        const docs=  await conn.query("select name,password from customer where email ='$1'",[data.email]);
        if(docs.rowCount == 0){
            response.newMail =true
        }
        else{
            if(docs.rows[0].password === data.password){
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


app.listen(3001,()=>console.log("App is running"));