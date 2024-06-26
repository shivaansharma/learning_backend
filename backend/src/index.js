import dbConnect from "./db/dbconnect.js";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config();
dbConnect()
.then(
    ()=>{
        app.listen(process.env.PORT,()=>{
            console.log("app is running on port 8000")
        })
    }
)
.catch((err)=>{
    console.log("mongo failed to connect !!!!",err)
})


//console.log(process.env.MONGODB_URL, DB_NAME);

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//     } catch (error) {
//         console.error("ERROR : ", error);
//         throw error;
//     }
// })();
