import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import { connect } from "./database/db.js";
import cors from "cors";
import "dotenv/config";

import { router as userRouter } from "./routes/user.js";
import { router as blogRouter } from "./routes/blog.js";
//express app
const app = express();

//use
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routes
app.use("/blog", blogRouter);
app.use("/user", userRouter);
//database
(async function () {
  try {
    await connect(process.env.MONGO_URI);
    console.log("DB connected");
    var port = process.env.PORT || 3001;
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (err) {
    console.log(err.message);
  }
})();
