import * as db from "../db/queries.js";

async function postUpload(req, res) {
  try {
    await db.registerFile(req.user.id, req.file);
  } catch (err) {
    res.render("upload", {
      user: req.user,
      errors: err,
    });
  }

  res.redirect("/filesystem");
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
  postUploadError,
  handleStorage,
};
