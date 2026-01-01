import { X509Certificate } from "node:crypto";
import * as db from "../db/queries.js";

async function postDelete(req, res) {
  console.log(req.body);
  let type = parseInt(req.body?.fileType);
  const id = parseInt(req.body?.entryID);

  if (type == null || id == null || type < 1 || type > 2) {
    res.redirect(`/filesystem/${req.user.username}`);
    return;
  }

  let error = "";

  if (type === 1) {
    await db.deleteFile(req.user.id, id);
  } else if (type === 2) {
    try {
      await db.deleteFolder(req.user.id, id);
    } catch (e) {
      console.error(e);
      error = e;
    }
  } else {
    error = "An error with the action occured. Please try again.";
  }

  res.redirect(`/filesystem/${req.user.username}`);
}

export default { postDelete };
