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

  const userFolders = await db.getAllFolders(req.user.id);
  const folderList = await Promise.all(
    userFolders.map(async (f) => {
      return {
        id: f.id,
        path: await db.getFolderAbsolutePath(f.id),
      };
    }),
  );

  let error = "";
  let showCrumbs = true;
  if (baseFolder?.id === -1) {
    showCrumbs = false;
    error = "This directory does not exist! Let's go back.";
  } else if (!fs.files.length && !fs.folders.length) {
    error = "This folder is empty. Try uploading something!";
  }

  let paths = null;
  if (req.params?.folder?.length && req.params?.folder?.length > 0) {
    paths = JSON.parse(JSON.stringify(req.params.folder));
  }

  const props = {
    user: req.user,
    dest: req.params?.folder,
    directory: dir,
    files: fs?.files,
    folders: fs?.folders,
    allFolders: folderList,
    showCrumbs: showCrumbs,
    paths: paths,
    error: error,
  };

  res.render("filesystem", props);
}

export default {
  getFilesystemBase,
  getFilesystem,
};
