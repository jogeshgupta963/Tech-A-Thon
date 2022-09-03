import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  tag: {
    type: String,
    enum: ["Technical", "Designing", "Finance", "NSFW"],
  },
});
BlogSchema.set("timestamps", true);
const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
