import { createRouter } from 'next-connect'
import connectDb from "@/utils/connectDb"
import user from '@/model/user';
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

// Database connection
connectDb()

const router = createRouter();

router.post(async (req, res) => {
    try {
        let User = await user.findOne({ email: req.body.email })

        if (User) {

            var bytes = CryptoJS.AES.decrypt(User.password, process.env.AES_SECRET);
            var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
            // console.log("Decrypted Password is     :  " + decryptedPassword);

            if (decryptedPassword === req.body.password) {
                var token = jwt.sign({name:User.name,email:User.email}, process.env.JWT_SECRET , {
                 expiresIn:"2d"   
                });
                // console.log(token);
                res.status(200).json({ success: true, token })
            }
            else {
                res.status(401).json({ success: false, error: "InValid Credentials" })
            }
        }
        else {
            res.status(404).json({ success: false, error: "No User Found" })
        }


    } catch (error) {
        console.log("Error in creating User" + error);
    }
})

export default router.handler()