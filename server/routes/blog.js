import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getUserBlogs,
} from "../controllers/blog.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/uploads.js";

const router = express.Router();

router
  .route("/")
  .post(upload.single("image"), auth, createBlog)
  .get(getAllBlogs);

router.route("/user/:user_id").get(getUserBlogs);

router.route("/:id").get(getBlogById).delete(auth, deleteBlog);

export { router };
