export const Fileerrorhandler = (err, req, res, next) => {
  if (err) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({
          message:
            "photo size is grater than 3MB!!! plight reduce the photo size",
        });
    }
    return res
      .status(500)
      .json({ message: "An error occurred", error: err.message });
  }
  next();
};
