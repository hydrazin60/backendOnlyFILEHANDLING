import multer from "multer";

const storage = multer.memoryStorage(); // Use memory storage for simplicity
const upload = multer({ storage });

export default upload;
