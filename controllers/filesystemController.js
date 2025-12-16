import * as db from "../db/queries.js";

async function getFilesystemBase(req, res) {
  if (!req.user) {
    res.redirect("/");
  } else {
    res.redirect("/filesystem/" + req.user.username);
  }
}

async function getFilesystem(req, res) {
  const fs = await db.getFolderContents(req.user.id);

  const props = {
    user: req.user,
    files: fs?.files,
    folders: fs?.folders,
  };

  res.render("filesystem", props);
}

export default {
  getFilesystemBase,
  getFilesystem,
};
