import { Router } from "express"; // Importing Router from express
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
const router = Router(); // Creating a router instance using Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },{
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser);

export default router;
