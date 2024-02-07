import mongoose  from "mongoose";

const videoSchema= new Schema({
    videoFile:{
        type:String, //cloudinary
        required:true,
    },
    thumbnail:{
        type: String,
        requied:true,
    },
    title:{
        type: String,
        requied:true,
    },
    description:{
        type: String,
        requied:true,
    },
    duration:{
        type: Number, //cloudnary
        requied:true,
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref : "User"
    },

},{
    timestamps:true,
});



export const Video=mongoose.model("Video",videoSchema);