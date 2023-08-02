import { conn } from "../dbconfig.js";
import  express  from "express";

const router=express.Router()



//adding review for a product

router.post('/addreview', async (req, res) => {
    const data = req.query
    //console.log(data)
    try {
        await conn.query("insert into reviews(id,username,review) values($1,$2,$3)", [data.id, data.username, data.review])
        console.log("Review added to product : " + data.id + " by " + data.username)
    }
    catch (err) {
        console.log('Error in adding review ' + err.message)
    }
})

//fetching all reviews from the db

router.get("/getreviews", async (req, res) => {
    var result = [];
    try {
        const docs = await conn.query("select * from reviews")
        //  console.log(docs)
        docs.rows.forEach(row => {
            result.push({
                id: row.id,
                username: row.username,
                review: row.review
            })
        })
        console.log(result.length + " Reviews fetched and loaded to localstorage");
    }
    catch (err) {
        console.log("error in getting reviews from the database: " + err.message);
    }
    // console.log("result : "+ result[0])
    res.json({ list: result })
})



export default router;