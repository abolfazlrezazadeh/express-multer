class blogControler {
    async createBlog(req, res, next) {
        try {
          const blogDateBody = await createBlogSchema.validateAsync(req.body);
          const { title, text, shortText, category, tags } = blogDateBody;
          req.body.image = path.join("/",
            blogDateBody.fileUploadPath,
            blogDateBody.fileName
          );
          req.body.image = req.body.image.replace(/\\/g, "/");
          const author = req.user._id;
          const image = req.body.image;
          const existBlog = await blogModel.findOne({ title: title });
          if (existBlog)
            throw createError.BadRequest("the blog titlt is Repetitive");
          const blog = await blogModel.create({
            title,
            text,
            shortText,
            category,
            tags,
            image,
            author,
          });
          return res.status(httpStatus.CREATED).json({
            statusCode: httpStatus.CREATED,
            data: {
              message: "the blog creat successfully",
            },
          });
        } catch (error) {
          deleteFileInPublic(req.body.image);
          next(error);
        }
      }
}

module.exports = {
    blogController : new blogControler()
}