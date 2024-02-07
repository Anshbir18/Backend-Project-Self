 import mongoose  from "mongoose";

 const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true // for making searching better
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, //cloudinary ka url
        required:true,
    },
    coverImage:{
        type:String, //cloudinary ka url
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId, // taking refernce form some other table
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required: [true,"password is required"],

    },

    refreshToken:{
        type:String,
    }

 },{
    timestamps:true, //created at updated at
 }
 
 )


 export const User=mongoose.model('User',userSchema)  //stored in db as users