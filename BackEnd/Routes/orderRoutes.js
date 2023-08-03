import { conn } from "../dbconfig.js";
import  express  from "express";

const router=express.Router()

//to order items from the cart

router.post("/orderitem", async (req, res) => {
    const data = req.query
    // console.log(data.items[0].id)
    //console.log(data.date)
    const response = { ordered: false }
    try {
        console.log(data)
        let index = 0
        //checking the date is already available in the database
        try {
            const docs = await conn.query("select * from orders where date=$1", [data.date])
            if (docs.rowCount !== 0) {
                index = docs.rows[0].index
            }
            else {
                const temp =await conn.query("select distinct date from orders")
                index = temp.rowCount + 1
            }

            console.log(index)
        }
        catch (err) {
            console.log(err.message)
        }
        data.items.forEach(async (item) => {
            console.log(item.price)
            await conn.query("insert into orders(username,date,id,name,quantity,price,index) values($1,$2,$3,$4,$5,$6,$7)", [data.username, data.date, item.id, item.name, item.quantity, item.price - "", index])
            try {
                const docs = await conn.query("select stock from products where id=$1", [item.id])
                const currentStock = docs.rows[0].stock
                const updatedStock = currentStock - item.quantity
                await conn.query("update products set stock=$1 where id=$2", [updatedStock, item.id])
            }
            catch (err) { console.log(err.message) }
        })
        response.ordered = true
        console.log("items ordered")
        await conn.query("delete from cart where username=$1", [data.username])
        console.log("items deleted from cart")
    }
    catch (err) {
        console.log("error in ordering  - " + err.message)
    }
    res.json(response)
})



//to get order history

router.get("/getorderhistory", async (req, res) => {
    const data = req.query
    var date = []
    var orders = []
    //const response={dates:[],items:[]}
    try {
        const dates = await conn.query("SELECT DISTINCT date,index FROM orders WHERE username=$1 order by index desc", [data.username])
        console.log(dates.rowCount)
        dates.rows.forEach((row) => {
            date.push({ date: row.date })
        })
        const items = await conn.query("SELECT * FROM ORDERS WHERE username=$1", [data.username])
        items.rows.forEach((row) => {
            orders.push({
                id: row.id,
                name: row.name,
                quantity: row.quantity,
                price: row.price,
                date: row.date
            })
        })
        console.log(dates)
        //response.items=items

    }
    catch (err) {
        console.log("error in getting history " + err.message)
    }
    // console.log(response)
    res.json({ dates: date, items: orders })
    //console.log(orders);
})



export default router;