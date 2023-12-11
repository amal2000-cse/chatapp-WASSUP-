import mongoose from "mongoose";

const chatSchema=new mongoose.Schema({
    name:String,
    message:String,
    timeStamp:Date
})

export const chatModel=mongoose.model("Chat",chatSchema);