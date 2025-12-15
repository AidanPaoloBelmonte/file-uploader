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
  console.log(req.body);

  if (!req.user) {
    res.redirect("/");
  }

  res.redirect("/");
}

function handleStorage(req, file, cb) {
  cb(null, file.originalname);
}

export default {
  getUpload,
  postUpload,
  handleStorage,
};
