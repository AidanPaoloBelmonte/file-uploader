import * as db from "../db/queries.js";

function getUpload(req, res) {
  if (!req.user) {
    res.redirect("/");
  }

  res.render("upload", {
    user: req.user,
  });
}

function postUpload(req, res) {
  res.redirect("/");
}

function postUploadError(err, req, res, next) {
  console.log("Errors:", err.code);
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
  getUpload,
  postUpload,
  postUploadError,
  handleStorage,
};
