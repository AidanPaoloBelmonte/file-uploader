import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

import * as db from "../db/queries.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.HOST_KEY,
  api_secret: process.env.HOST_SECRET,
});

async function postUpload(req, res, next) {
  let url = "";

  let error = "";

  try {
    const fileBuffer = req.file.buffer;
    const result = await cloudinary.uploader.upload_stream(
      {
        folder: "demo",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return res.status(500).json({ error });
        req.file.url = result.secure_url;
        next();
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(result);
  } catch (err) {
    console.log(err);
    res.redirect("/filesystem");
    return;
  }
}

async function postUploadRegister(req, res) {
  const folder = await db.getBaseFolder(req.user.id, req.params?.folder);

  try {
    db.registerFile(req.user.id, req.file, folder.id);
  } catch (err) {
    console.log(err);
    res.redirect("/filesystem");
    return;
  }

  let parentPath =
    `/filesystem/${req.user.username}` +
    (await db.getFolderAbsolutePath(folder.id));

  if (parentPath.endsWith("/")) {
    parentPath = parentPath.substring(0, parentPath.length - 1);
  }

  res.redirect(parentPath);
}

function postUploadError(err, req, res, next) {
  if (err.code === "LIMIT_FILE_SIZE") {
    res.render("upload", {
      user: req.user,
      errors: "File must be under 1MB.",
    });
  } else {
    next(err);
  }
}

function handleStorage(req, file, cb) {
  cb(null, file.originalname);
}

export default {
  postUpload,
  postUploadRegister,
  postUploadError,
  handleStorage,
};
