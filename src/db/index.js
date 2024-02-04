import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connetDB = async ()=>{
    try{
        const connectionInstance=await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        )

        console.log(`\n mongoose connection made successfully ${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log("mongo db connection error",error);
        process.exit(1);
    }
}


export default  connetDB ;