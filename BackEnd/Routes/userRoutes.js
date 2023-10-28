import { conn } from "../dbconfig.js";
import  express  from "express";
import nodemailer from 'nodemailer';
const router=express.Router()


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'dhanushit419@gmail.com',
        pass: 'chec mqfk cmmm sewh',
    },
});


//sign up form - new user registration

const verifyEmail = async (email,username) => {
    const mailOptions = {
        from: 'dhanushit419@gmail.com',
        to: email,
        subject: 'User Registered Sucessfully in Trenify',
        text: 'Dear , '+username+' You are Sucessfully Registered in Trendify :)\nWelcome to Trendify',
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("sent");
        return true
    } catch (err) {

        console.log("Err "+err.message)
        return false
    }
};

router.post("/register", async (req, res) => {
    const data = req.query
    console.log(data)
    const response = { newUser: true, uniqueUsername: false,mail:false }
    // console.log(response)

    try {
        const docs = await conn.query("SELECT * FROM customer where email=$1", [data.email])
       // const docs1 = await conn.query("SELECT * FROM customer where username=$1", [data.username])

        if (docs.rowCount != 0) {
            response.newUser = false
        }
    }
    catch (err) {
        console.log("Error in checking the existence : " + err)
    }

    try {
        const docs = await conn.query("SELECT * FROM customer where username=$1", [data.username])
        if (docs.rowCount == 0) {
            response.uniqueUsername = true
        }
    }
    catch (err) {
        console.log("Error in checking the unique username : " + err)
    }


   //if(verifyEmail(data.email,data.username))response.mail=true;

    if ( response.newUser && response.uniqueUsername) {
        
        try {
            await conn.query("INSERT INTO customer(username,email,password,mobile_num,address,city) VALUES($1,$2,$3,$4,$5,$6);", [data.username, data.email, data.pwd, data.mobile, data.address, data.city])
        }
        catch (err) {
            console.log("Error in registration of new user : " + err)
        }
    }

    console.log(response)
    res.json(response)
})


//Login page verification


router.post("/login", async (req, res) => {
    const data = req.query
    console.log(data)
    const response = { correct: false, wrnpwd: true, newMail: false, username: '' }
    response.username = data.username
    // console.log(response)
    try {
        const docs = await conn.query("SELECT password FROM customer WHERE username = $1;", [data.username])
        if (docs.rowCount == 0) {
            response.newMail = true
        }
        else {
            if (docs.rows[0].password === data.pwd) {
                response.correct = true
                response.wrnpwd = false
            }
            else {
                response.wrnpwd = true
            }
        }
        console.log(response)
        res.json(response)
    }
    catch (err) {
        console.log("error in checking db : " + err.message);
    }

})



//profile page details of the user

router.get("/profile", async (req, res) => {
    const data = req.query
    // console.log(data)
    const response = { email: "", mobile: "", address: "", city: "", count: 0 }
    try {
        const docs = await conn.query("select * from customer where username=$1", [data.username])
        response.email = docs.rows[0].email
        response.mobile = docs.rows[0].mobile_num
        response.address = docs.rows[0].address
        response.city = docs.rows[0].city
        //console.log(docs)
        const docs1 = await conn.query("select * from orders where username=$1", [data.username])
        response.count = docs1.rowCount
    }
    catch (err) {
        console.log(err.message)
    }
    res.json(response)
})

// const verifyEmail = async (email) => {
//     const mailOptions = {
//         from: 'dhanushit419@gmail.com',
//         to: 'sdhanushk67@gmail.com',
//         subject: 'Email Verification Test',
//         text: 'This is a test email for verification.',
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log("sent");
//     } catch (err) {
//         console.log("Err "+err.message)
//     }
// };


export default router;