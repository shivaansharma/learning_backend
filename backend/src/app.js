import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded());
app.use(express.static("public"))
app.use(cookieParser())

//routes 
import userRouter from "./routes/user.routes.js"

app.use("/users",userRouter)

export {app}