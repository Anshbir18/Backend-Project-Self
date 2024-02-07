 import mongoose  from "mongoose";

 import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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


 userSchema.pre("save", function(next){
    if(!this.isModified(this.password)){
        return next(); //do nothing if the password is not changed
    }

    this.password = bcrypt.hash(this.password,10)
    next();
 })


//  checking if the password is correct or not

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

 export const User=mongoose.model('User',userSchema)  //stored in db as users