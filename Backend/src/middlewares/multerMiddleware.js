import multer from "multer";
import __dirname from "../utils.js";
import logger from "../utils/logger.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folderName;
    if (file.fieldname === "avatar") {
      folderName = "profiles";
    } else if (file.fieldname === "thumbnail") {
      folderName = "products";
    } else {
      folderName = "documents";
    }
    cb(null, `${__dirname}/public/uploads/${folderName}`);
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname.replace(/\s/g, "_");
    const timestamp = new Date()
      .toLocaleString()
      .replace(/, /g, "_")
      .split(/[\/:,\s]/)
      .join("-")
      .replace(/"/g, "_");
    cb(null, `${timestamp}_${originalname}`);
  },
});

export const multerMiddleware = multer({
  storage: storage,
  onError: (err, next) => {
    logger.error(err);
    next(err);
  },
});
