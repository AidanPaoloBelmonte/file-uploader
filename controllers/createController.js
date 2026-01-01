import * as db from "../db/queries.js";

async function postCreate(req, res) {
  try {
    const base = await db.getBaseFolder(req.user.id, req.params?.folder);

    if ((req.params?.folder && base === null) || base === undefined) {
      throw new Error("Cannot find Base Directory to create the folder in.");
    }

    await db.createFolder(req.user.id, req.body.newFolder, base);

    const basedir = req.params?.folder ? "/" + req.params.folder.join("/") : "";
    res.redirect(`/filesystem/${req.user.username}${basedir}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/filesystem/${req.user.username}`);
  }
}

export default {
  postCreate,
};
