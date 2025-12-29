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
  const fs = await db.getFolderContents(req.user.id);
  const basedir = req.params?.folder ? req.params.folder.join("/") : "";
  const dir = `/filesystem/${req.user.username}/${basedir}`;

  const props = {
    user: req.user,
    dest: req.params?.folder,
    directory: dir,
    files: fs?.files,
    folders: fs?.folders,
  };

  res.render("filesystem", props);
}

export default {
  getFilesystemBase,
  getFilesystem,
};
