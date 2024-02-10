import { Router } from "express"; // Importing Router from express
import { registerUser } from "../controllers/user.controller.js";

const router = Router(); // Creating a router instance using Router()

router.route("/register").post(registerUser);

export default router;
