import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import {User} from "../modles/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { response } from "express";
import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser=asyncHandler(async(req,res)=>{
    // res.status(200).json({
    //     message:"ok",
    // })


    // get userDetails
    // validation
    // check if user already exists using email and username
    // check for images
    // upload to cloudinary,avatar
    // create user object
    // remove password and refresh token
    // check for user creation
    // return response
    
    const {fullName,email,password,username}=req.body;
    console.log("email",email);

    // if(fullName=== ""){
    //     throw new ApiError(404., "fullname is required")
    // }

    if(
        [fullName,email,password,username].some((feild)=>(
            feild?.trim()===""
        ))
    ){
        throw new ApiError(404., "all feilds are is required")
    }



    // check if user exists or not

    const existeduser=User.findOne({
        $or:[{ username },{ email }]
    })

    if(existeduser){
        throw new ApiError(409., "user already exists");
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;
    console.log(req.files?.avatar[0]?.path)

    const CoverImageLocalPath=req.files?.coverImage[0]?.path;


    if(!avatarLocalPath){
        throw new ApiError(400,"missing avatar")
    }

    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage =await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"missing avatar")
    }



    // entery in database

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url ||"",
        email,
        password,
        username : username.toLowerCase(),
    })

    // chek if user is made
    const createUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createUser) {
        throw new ApiError(500,"something went wrong while refreshing user")
    }

    return res.status(201).json(
        new ApiResponse(200,createUser,"user created successfullu")
    )

})
export { registerUser}