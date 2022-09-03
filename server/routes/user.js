import express from "express";

const router = express.Router();
import { auth } from "../middleware/auth.js";
import { registerUser, loginUser, getAllUsers } from "../controllers/user.js";

router.route("/").post(registerUser).get(getAllUsers);

router.route("/login").post(loginUser);

export { router };
