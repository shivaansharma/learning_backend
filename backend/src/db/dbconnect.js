import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

//console.log(DB_NAME,process.env)

const dbConnect = async ()=>{
    try {
       const ConnectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       console.log(`mongo db connected`)
    } catch (error) {
        console.error("error",error)
        throw error;
    }
}

export default dbConnect;