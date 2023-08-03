import { conn } from "../dbconfig.js";
import  express  from "express";

const router=express.Router()

//to display cart item of the user

router.get("/cart", async (req, res) => {
    const data = req.query
    var result=[]
    try {
        const docs = await conn.query("SELECT products.id,products.name,products.price,products.imgurl FROM products JOIN cart ON products.id = cart.id WHERE cart.username = $1", [data.username])
        docs.rows.forEach(row => {
            result.push({
                id: row.id,
                name: row.name,
                price: row.price,
                imgurl: row.imgurl
            })
        })
        console.log("Cart of user : " + data.username + "fetched and Loaded to localstorage ")
        //console.log(result)
        res.json({ list: result, count: docs.rowCount,status:true })
        //console.log(result)
    }
    catch (err) {
        console.log("error in displaying product from the database: " + err.message);
    }

    //console.log(result)
})


//adding to cart

router.post("/addtocart", async (req, res) => {
    const data = req.query
    const response = { added: false }
    try {
        await conn.query("insert into cart values($1,$2)", [data.username, data.id])
        response.added = true
        console.log("Product added to cart of user : " + data.username + " with id :" + data.id)
    }
    catch (err) {
        console.log("error in adding product to cart : " + err.message);
    }
    res.json(response)
})

//delete from cart

router.post("/deletefromcart", async (req, res) => {
    const data = req.query
    //console.log(data)
    const response = { deleted: false }
    try {
        await conn.query("delete from cart where username=$1 and id=$2", [data.username, data.id])
        response.deleted = true
        console.log("Product Deleted from cart of user : " + data.username + " with id :" + data.id)
    }
    catch (err) {
        console.log("error in deleting product to cart : " + err.message);
    }
    res.json(response)
})

//checking cart and fav whether its added or not

// router.post("/checkcart",async(req,res)=>{
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







export default router;