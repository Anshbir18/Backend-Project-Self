const asyncHandler=(requestHandler)=>{
    (req,res,next)=>{
        //simple we have goten a promise that we resolve and catch
        Promise.resolve(requestHandler(req,res,next)).catch((err)=> {
            next(err);
        });

    }
}


export {asyncHandler}



// try carch format


// const asyncHandler = () =>{}  //basic

// const asyncHandler = () =>{
//     ()=>{

//     }
// }

// const asyncHandler = (fn)=> () =>{
//     async (req,res,next)=>{
//         try{
//             await fn(req,res,next)
//         }catch(error){
//             res.status(err.code||500).json({
//                 success:false,
//                 message: err.message
//             })
//         }
//     }
// }