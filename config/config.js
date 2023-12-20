import mongoose from "mongoose";

export const connect=async()=>{

    await mongoose.connect("mongodb+srv://amal:suvarnam123@cluster0.he09jpu.mongodb.net/?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Db is connected");
}