
const { uploadFile, uploadVideo } = require("./multer");
const router = require("express").Router();

router.post(
  "/add",
  uploadFile.single("image"),
  adminBlogController.createBlog
);
router.post("/episode/add",  uploadVideo.single("video"), episodeController.addNewEpisode);
