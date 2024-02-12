import {v2 as cloud} from "cloudinary"
import fs from "fs"


import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME ,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary=async (localfilepath)=>{
    try{
        if(!localfilepath){
            return null;
        }
        // upload file in cloud
        const response=await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })
        console.log("file uploaded successfully",response.url);
       return response
    }catch(error){
        fs.unlink(localfilepath) // remove the temporary local file as operation got failed
    }
}

export {uploadOnCloudinary}