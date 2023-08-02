import { conn } from "../dbconfig.js";
import  express  from "express";

const router=express.Router()

//get favs of user

router.get("/getfavs", async (req, res) => {
    const data = req.query
    var result = []
    try {
        const docs = await conn.query("SELECT products.id,products.name,products.price,products.imgurl FROM products JOIN favs ON products.id = favs.id WHERE favs.username = $1", [data.username])
        docs.rows.forEach((row) => {
            result.push({
                id: row.id,
                name: row.name,
                price: row.price,
                img: row.imgurl
            })
        })
        console.log(result)
    }
    catch (err) {
        console.log(err.message)
    }
    res.json({ list: result })
})

//checking in favs
router.post("/checkfavs", async (req, res) => {
    const data = req.query
    const response = { fav: true }
    try {
        const fav = await conn.query("select *from favs where username=$1 and id=$2", [data.username, data.id])
        if (fav.rowCount == 0) {
            response.fav = false
        }
    }
    catch (err) {
        console.log("error in checking product in favs : " + err.message);
    }
    res.json(response)
})


//adding to favourites

router.post("/addtofav", async (req, res) => {
    const data = req.query
    const response = { added: false }
    console.log(data)
    try {
        await conn.query("insert into favs values($1,$2)", [data.username, data.id])
        response.added = true
        console.log("added to fav id : " + data.id)
    }
    catch (err) {
        console.log("error in adding product to fav : " + err.message);
    }
    res.json(response)
})

//remove from fav

router.post("/removefromfav", async (req, res) => {
    const data = req.query
    const response = { removed: false }
    try {
        await conn.query("delete from favs where username=$1 and id=$2", [data.username, data.id])
        response.removed = true
        console.log("removed from fav id : " + data.id)
    }
    catch (err) {
        console.log("error in removing product from fav : " + err.message);
    }
    res.json(response)
})




export default router;