import multer from "multer";
import logger from "../utils/logger.js";
import { config } from "../config/env.config.js";
import { v2 as cloudinary } from "cloudinary";
import { authService } from "../services/factory.js";

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

const storage = multer.memoryStorage();

export const uploadToCloudinary = (fieldName, uploadType) => {
  return (req, res, next) => {
    let multerUpload;

    switch (uploadType) {
      case "single":
        multerUpload = multer({
          storage: storage,
          onError: (err, next) => {
            logger.error(err);
            next(err);
          },
        }).single(fieldName);
        break;
      case "array":
        multerUpload = multer({
          storage: storage,
          onError: (err, next) => {
            logger.error(err);
            next(err);
          },
        }).array(fieldName);
        break;
      case "any":
        multerUpload = multer({
          storage: storage,
          onError: (err, next) => {
            logger.error(err);
            next(err);
          },
        }).any();
        break;
      case "fields":
        multerUpload = multer({
          storage: storage,
          onError: (err, next) => {
            logger.error(err);
            next(err);
          },
        }).fields(fieldName);
        break;
      default:
        return res.status(400).json({ error: "Tipo de carga no válido." });
    }

    multerUpload(req, res, async (err) => {
      if (err) {
        logger.error(err);
        return res.status(400).json({ error: "Error al cargar el archivo." });
      }

      try {
        if (req.file) {
          const b64 = Buffer.from(req.file.buffer).toString("base64");
          let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
          const originalname = req.file.originalname
            .split(".")[0]
            .replace(/\s/g, "_");
          const timestamp = new Date()
            .toLocaleString()
            .replace(/, /g, "-")
            .replace(/:|\//g, "-")
            .replace(/\s/g, "_");
          const customPublicId = `${timestamp}_${originalname}`;

          const result = await cloudinary.uploader.upload(dataURI, {
            public_id: customPublicId,
            folder: "uploads",
          });
          req.cloudinaryUrl = result.secure_url;
        } else if (req.files && req.files.length > 0) {
          const uploadResponses = [];
          for (const file of req.files) {
            const b64 = Buffer.from(file.buffer).toString("base64");
            let dataURI = "data:" + file.mimetype + ";base64," + b64;
            const originalname = file.originalname
              .split(".")[0]
              .replace(/\s/g, "_");
            const timestamp = new Date()
              .toLocaleString()
              .replace(/, /g, "-")
              .replace(/:|\//g, "-")
              .replace(/\s/g, "_");
            const customPublicId = `${timestamp}_${originalname}`;

            const response = await cloudinary.uploader.upload(dataURI, {
              public_id: customPublicId,
              folder: "uploads",
            });
            uploadResponses.push(response);
          }
          req.cloudinaryUploads = uploadResponses.map((response) => ({
            name: `${response.public_id.split("uploads/")[1]}.${
              response.format
            }`,
            url: `${response.secure_url}`,
          }));
        } else if (req.files) {
          const { id, residenceProof, bankStatementProof } = req.files;
          const uploadResponses = [];
          const files = {
            id: id[0],
            residenceProof: residenceProof[0],
            bankStatementProof: bankStatementProof[0],
          };

          const { uid } = req.params;
          const { documents } = await authService.getAccountById(uid);

          for (const [fileKey, file] of Object.entries(files)) {
            let arrayDocuments = Array.isArray(documents)
              ? documents
              : [documents];
            if (arrayDocuments.some((doc) => doc.file.includes(fileKey))) {
              continue;
            }
            const b64 = Buffer.from(file.buffer).toString("base64");
            let dataURI = "data:" + file.mimetype + ";base64," + b64;
            const originalname = file.originalname
              .split(".")[0]
              .replace(/\s/g, "_");
            const timestamp = new Date()
              .toLocaleString()
              .replace(/, /g, "-")
              .replace(/:|\//g, "-")
              .replace(/\s/g, "_");
            const customPublicId = `${timestamp}_${originalname}`;

            const response = await cloudinary.uploader.upload(dataURI, {
              public_id: customPublicId,
              folder: "uploads",
            });
            uploadResponses.push({ ...response, file: fileKey });
          }
          
          if (uploadResponses.length === 0) {
            return res.status(400).json({
              success: false,
              error: "All 3 necessary files have already been uploaded.",
            });
          }

          req.cloudinaryUploads = uploadResponses.map((response) => ({
            name: `${response.public_id.split("uploads/")[1]}.${
              response.format
            }`,
            url: `${response.secure_url}`,
            file: response.file,
          }));
        }

        next();
      } catch (error) {
        console.error("Error al subir archivo(s) a Cloudinary:", error);
        res.status(500).json({ error: "Hubo un error al subir el archivo." });
      }
    });
  };
};
