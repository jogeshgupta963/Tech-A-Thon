import { s3Upload } from "../middleware/s3.js";
import Blog from "../models/Blog.js";

async function createBlog(req, res) {
  try {
    const user = req.user;
    let image;
    if (req.file) {
      image = await s3Upload(req.file);
    }
    const blog = await Blog.create({
      user: user._id,
      title: req.body.title,
      description: req.body.description,
      image: image.Location,
      tag: req.body.tag,
    });

    if (!blog)
      res.json({
        status: "error",
        msg: "Something went wrong...",
      });

    res.json({
      status: "success",
      msg: "blog created successfully",
      data: blog,
    });
  } catch (err) {
    res.json({
      status: "error",
      msg: err.message,
    });
  }
}

async function getAllBlogs(req, res) {
  try {
    const { filter } = req.query;
    let blogs;
    if (filter) {
      blogs = await Blog.find({ tag: filter });
    } else {
      blogs = await Blog.find().sort("timestamp");
    }
    res.json({
      status: "success",
      msg: "blogs",
      data: blogs,
    });
  } catch (err) {
    res.json({
      status: "error",
      msg: err.message,
    });
  }
}

async function getUserBlogs(req, res) {
  try {
    const blogs = await Blog.find({ user: req.params.user_id });
    res.json(blogs);
  } catch (err) {
    res.json({
      status: "error",
      msg: err.message,
    });
  }
}

async function getBlogById(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json({
      status: "success",
      msg: "blog",
      data: blog,
    });
  } catch (err) {
    res.json({
      status: "error",
      msg: err.message,
    });
  }
}

async function deleteBlog(req, res) {
  try {
    const blog = await Blog.deleteOne(req.params.id);

    res.json({
      status: "success",
      msg: "blog deleted successfully",
      data: blog,
    });
  } catch (err) {
    res.json({
      status: "error",
      msg: err.message,
    });
  }
}

export { createBlog, getAllBlogs, getUserBlogs, getBlogById, deleteBlog };
