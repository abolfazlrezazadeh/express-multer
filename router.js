
const { uploadFile } = require("./multer");
const router = require("express").Router();

router.post(
  "/add",
  uploadFile.single("image"),
  adminBlogController.createBlog
);
