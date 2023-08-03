import { conn } from "../dbconfig.js";
import  express  from "express";

const router=express.Router()


//to get the list of products from the database
router.get("/getproductlist", async (req, res) => {
    var result = [];
    try {
        const docs = await conn.query("select * from products")
        //  console.log(docs)
        docs.rows.forEach(row => {
            result.push({
                id: row.id,
                name: row.name,
                price: row.price,
                discount: row.discount,
                imgurl: row.imgurl,
                rating: row.rating,
                description: row.description,
                highlight1: row.highlight1,
                highlight2: row.highlight2,
                highlight3: row.highlight3,
                seller: row.seller,
                stock: row.stock

            })
        })
        console.log(result.length + " products fetched and loaded to localstorage");
    }
    catch (err) {
        console.log("error in listing the products from the database: " + err.message);
    }
    // console.log("result : "+ result[0])
    res.json({ list: result })
})


//to get the searched result from database

router.get("/search", async (req, res) => {
    const data = req.query
    //console.log(data)
    var result = [];
    try {
        if (data.searchTerm != '') {
            const searchTermArray = data.searchTerm.split(/[, ]+/);
            const searchTermIndexes = searchTermArray.map((term, index) => `$${index + 1}`).join(", ");
            const queryParams = searchTermArray.map((term) => `%${term}%`);
            //console.log(searchTermIndexes)
            console.log(queryParams)


            const query = `SELECT id, name, price, discount, imgurl FROM products
            WHERE keywords ILIKE ANY(ARRAY[${searchTermIndexes}])`;

            const docs = await conn.query(query, queryParams);

            console.log("SearchTerm : " + data.searchTerm + " Items Found : " + docs.rowCount)
            docs.rows.forEach(row => {
                result.push({
                    id: row.id,
                    name: row.name,
                    price: row.price,
                    discount: row.discount,
                    imgurl: row.imgurl,

                })
            })
        }
    }
    catch (err) {
        console.log("error in searching the products from the database: " + err.message);
    }
    //console.log(result[0])

    res.json({ list: result, count: result.length })
})



//To display the selected item from the database

router.get("/displayitem", async (req, res) => {
    const data = req.query
    const response = { name: '', price: '', discount: '', rating: '', description: '', highlight1: '', highlight2: '', highlight3: '', imgurl: '', seller: '' }
    try {
        const docs = await conn.query("select name,price,discount,rating,description,highlight1,highlight2,highlight3,imgurl,seller from products where id=$1", [data.id])
        // console.log(docs)

        response.name = docs.rows[0].name,
            response.price = docs.rows[0].price,
            response.discount = docs.rows[0].discount,
            response.rating = docs.rows[0].rating,
            response.description = docs.rows[0].description,
            response.highlight1 = docs.rows[0].highlight1,
            response.highlight2 = docs.rows[0].highlight2,
            response.highlight3 = docs.rows[0].highlight3,
            response.imgurl = docs.rows[0].imgurl,
            response.seller = docs.rows[0].seller

        // console.log(response)
    }
    catch (err) {
        console.log("error in displaying product from the database: " + err.message);
    }
    res.json(response)

})

router.post("/addstock",async(req,res)=>{
    console.log(req.query)
    const data=req.query
    try{
        const docs=await conn.query("select stock from products where id=$1",[data.id])
        const updatedStock=docs.rows[0].stock+parseInt(data.newStockValue)
        console.log(updatedStock)
        await conn.query("update products set stock=$1 where id=$2",[updatedStock,data.id])
        console.log("Stock added for ID: "+data.id)
    }
    catch(err){
        console.log(err.message)
    }
})


export default router;