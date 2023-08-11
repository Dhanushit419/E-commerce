import { conn } from "../dbconfig.js";
import  express  from "express";

const router=express.Router()

//verifying admin

router.get("/verifyadmin", async (req, res) => {
    const data = req.query
    const response = { admin: false }
    try {
        const docs = await conn.query("select * from admin where id=$1", [data.id])
        if (docs.rows[0].password == data.pwd) {
            response.admin = true
        }
    }
    catch (err) {
        console.log(err.message)
    }
    res.json(response)
})



router.get('/dashboard', async (req, res) => {
    const data = req.query
    console.log(data)
    const response = { admin: false, products: 0, users: 0, revenue: [], stock: 0, completerevenue: 0, img: '' }

    try {
        //admin verification
        const docs = await conn.query("select * from admin where id=$1", [data.adminname])
        //console.log(docs)
        if (docs.rowCount !== 0) {
            response.img = docs.rows[0].img
            response.admin = true;
            const TotalProducts = await conn.query("select * from products")
            response.products = TotalProducts.rowCount
            console.log(TotalProducts.rowCount)

            const TotalUsers = await conn.query("select * from customer")
            response.users = TotalUsers.rowCount
            console.log(TotalUsers.rowCount)

            const stockCount = await conn.query("SELECT SUM(stock) AS total_stock from products")
            response.stock = stockCount.rows[0].total_stock
            console.log(response.stock)

            const completerevenue = await conn.query("SELECT SUM(price) AS revenue from orders")
            response.completerevenue = completerevenue.rows[0].revenue
            console.log(response.completerevenue)

            try {
                const totalrevenue = await conn.query("SELECT date, SUM(price) AS revenue,COUNT(name) AS count,index FROM orders GROUP BY date,index order by index")
                totalrevenue.rows.forEach((row) => {
                    response.revenue.push({
                        date: row.date,
                        revenue: row.revenue,
                        ProductsPurchased: row.count
                    })
                })
            }
            catch (err) {
                console.log(err.message)
            }

        }
        console.log(response)
    }
    catch (err) {
        console.log(err.message)
    }

    res.json(response)
})


//adding product into database

router.post("/addproduct", async (req, res) => {
    const data = req.query
    console.log(data)
    const response = { name: '', added: false, id: '' }
    try {
        //to get the id of the product 
        const count = await conn.query("select * from products")
        const id = count.rowCount + 1
        const rating = 5
        console.log(id)
        await conn.query("INSERT INTO products(id,name,price,discount,rating,description,highlight1,highlight2,highlight3,imgurl,seller,keywords,stock) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);", [id, data.name, data.price, data.discount, rating, data.description, data.highlight1, data.highlight2, data.highlight3, data.imgurl, data.seller, data.keywords, data.stock])
        response.added = true
        response.id = id
        response.name = data.name
        console.log("New Product added with id :" + id + " Name : " + data.name)
    }
    catch (err) {
        console.log("error in adding product in database : " + err.message);
    }
    // console.log(response)
    res.json(response)
})

//products list fetched in productroutes
//user list fetching

router.get("/userlist", async (req, res) => {
    var result = [];
    try {
        const docs = await conn.query("select * from customer")

        // console.log(docs)
        for (const row of docs.rows) {
            const temp = await conn.query("select * from orders where username=$1", [row.username]);
            result.push({
                username: row.username,
                email: row.email,
                mobile_num: row.mobile_num,
                city: row.city,
                address: row.address,
                count: temp.rowCount
            })
        }
        console.log(result.length + " users");
    }
    catch (err) {
        console.log("error in listing users: " + err.message);
    }
    res.json({ list: result })
})


export default router;