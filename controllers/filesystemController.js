import * as db from "../db/queries.js";

let called = 0;

async function getFilesystemBase(req, res) {
  if (!req.user) {
    res.redirect("/");
  } else {
    res.redirect("/filesystem/" + req.user.username);
  }
}

async function getFilesystem(req, res) {
  const baseFolder = await db.getBaseFolder(req.user.id, req.params?.folder);

  const fs = await db.getFolderContents(req.user.id, baseFolder?.id);

  const basedir = req.params?.folder ? "/" + req.params.folder.join("/") : "";
  const dir = `/filesystem/${req.user.username}${basedir}`;

  let error = "";
  if (baseFolder?.id === -1) {
    error = "This directory does not exist! Let's go back.";
  } else if (!fs.files.length && !fs.folders.length) {
    error = "This folder is empty. Try uploading something!";
  }

  const props = {
    user: req.user,
    dest: req.params?.folder,
    directory: dir,
    files: fs?.files,
    folders: fs?.folders,
    error: error,
  };

  res.render("filesystem", props);
}

export default {
  getFilesystemBase,
  getFilesystem,
};
