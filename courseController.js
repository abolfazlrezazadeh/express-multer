class courseController{
    async addNewEpisode(req, res, next) {
        try {
          const {
            type,
            title,
            text,
            chapterId,
            courseId,
            fileUploadPath,
            fileName,
          } = req.body;
          const videoAddress = path
            .join(fileUploadPath, fileName)
            .replace(/\\/g, "/");
          const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
          //package for get video time in second
          const second = await getVideoDurationInSeconds(videoUrl);
          //get time return seconds in 00:00:00 format
          const time = getTime(second);
          const episode = {
            type,
            title,
            text,
            time,
            videoAddress,
          };
          const createEpisodeResult = await courseModel.updateOne(
            { _id: courseId, "chapters._id": chapterId },
            {
              $push: {
                "chapters.$.episodes": episode,
              },
            }
          );
          if (createEpisodeResult.modifiedCount == 0)
            throw createError.InternalServerError("adding episode is failed");
          return res.status(httpStatus.OK).json({
            StatusCodes: httpStatus.OK,
            data: {
              message: "adding episde is successfull",
            },
          });
        } catch (error) {
          next(error);
        }
      }
}