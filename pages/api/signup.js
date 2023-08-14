import { createRouter } from 'next-connect'
import connectDb from "@/utils/connectDb"
import user from '@/model/user';
var CryptoJS = require("crypto-js");

// Database connection
connectDb()

const router = createRouter();

router.post(async(req,res)=>{
     try {
        const {name,email,password}  = req.body
        let User = new user({name:name,email:email,password:CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString()})

        await User.save()
        res.status(200).json({success:"User has been created"})

     } catch (error) {
         console.log("Error in creating User" + error);
     }
})

export default router.handler()