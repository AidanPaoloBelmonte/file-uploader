import * as db from "../db/queries.js";

async function postMove(req, res) {
  const type = parseInt(req.body?.fileType);
  const id = parseInt(req.body?.entryID);
  const parent = parseInt(req.body?.moveEntry);

  if (type == null || id == null || type < 1 || type > 2 || parent < 0) {
    res.redirect(`/filesystem/${req.user.username}`);
    return;
  }

  let error = "";
  try {
    await db.moveEntry(type, id, parent);
  } catch (e) {
    error = e;
  }

  let parentPath =
    `/filesystem/${req.user.username}` +
    (await db.getFolderAbsolutePath(parent));

  if (parentPath.endsWith("/")) {
    parentPath = parentPath.substring(0, parentPath.length - 1);
  }

  res.redirect(parentPath);
}

export default { postMove };
