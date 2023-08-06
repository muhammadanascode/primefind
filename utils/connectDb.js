import mongoose from "mongoose";


//Connection to database
export default async function connectDb() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/primefind",{
            useUnifiedTopology:true,
            useNewUrlParser:true
        });
           console.log("database connected");
        
    } catch (error) {
        console.log("Error in creating connection to db" + error)
    }
}
