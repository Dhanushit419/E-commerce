import express, { response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import UserRoutes from './Routes/userRoutes.js'
import AdminRoutes from './Routes/adminRoutes.js'
import ProductRoutes from './Routes/productRoutes.js'
import CartRoutes from './Routes/cartRoutes.js'
import FavRoutes from './Routes/favRoutes.js'
import OrderRoutes from './Routes/orderRoutes.js'
import OtherRoutes from './Routes/otherRoutes.js'
import { connectDB } from "./dbconfig.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



 app.use("/user",UserRoutes)
 app.use("/admin",AdminRoutes)
 app.use("/products",ProductRoutes)
 app.use("/cart",CartRoutes)
 app.use("/orders",OrderRoutes)
 app.use("/favs",FavRoutes)
 app.use("/others",OtherRoutes)


connectDB().then(()=>{
    app.listen(3001, () => console.log("App is running"));
})
