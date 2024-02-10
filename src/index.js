import 'dotenv/config'
import {app} from './app.js'

import connetDB from "./db/index.js";

connetDB()

.then(()=>{
    app.on("error",(err)=>{
        console.log(`Error: ${err}`);
    })
    app.listen(process.env.PORT ||8000 , ()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO DB CONNECTION FAILED!!!!!", err);
})