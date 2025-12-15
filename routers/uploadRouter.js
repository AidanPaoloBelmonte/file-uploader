import { Router } from "express";
import multer from "multer";

import uploadController from "../controllers/uploadController.js";

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: uploadController.handleStorage,
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILESIZE),
  },
});

const uploadRouter = Router();

uploadRouter.get("/", uploadController.getUpload);
uploadRouter.post(
  "/",
  upload.single("file"),
  uploadController.postUploadError,
  uploadController.postUpload,
);

export default uploadRouter;
