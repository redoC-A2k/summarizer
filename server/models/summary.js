import mongoose from "mongoose";

const schema = new mongoose.Schema({
    _id:{
        type: Number,
        required:true
    },
    summary:{
        type:String,
        required:true
    }
});
export const summaryModel = mongoose.model("Summary",schema)