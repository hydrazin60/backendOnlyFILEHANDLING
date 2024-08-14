import DataURIParser from "datauri/parser.js";
import path from "path";

const parser = new DataURIParser();

const getDatauri = (file) => {
  const extName = path.extname(file.originalname).toString(); 
  return parser.format(extName, file.buffer);
};
export default getDatauri;
