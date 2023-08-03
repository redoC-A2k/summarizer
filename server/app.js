import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors"
import {router} from "./controllers/summarize.js"
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(`${process.env.MONGOURI}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex: true,
});

mongoose.Promise = global.Promise;
mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeah !");
});

mongoose.connection.on("error",()=>{
   console.log("error connecting to mongo " ,)
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors())
// app.use(express.json())
app.use(router)
app.listen(process.env.PORT,()=>{
    console.log("server is running on "+process.env.PORT)
})