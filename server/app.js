import express from "express";
const app = express();
import cors from "cors"
import router from "./controllers/summarize.js"
import dotenv from 'dotenv'
dotenv.config()

app.use(cors())
// app.use(express.json())
app.use(router)
app.listen(process.env.PORT,()=>{
    console.log("server is running on "+process.env.PORT)
})