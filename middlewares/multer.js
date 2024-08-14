// import multer from "multer";
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// export default upload;
 
import multer from "multer";
const MAX_SIZE = 4 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG and PNG files are allowed."));
    }
  },
});

export default upload;