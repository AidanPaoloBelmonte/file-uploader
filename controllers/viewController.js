import * as db from "../db/queries.js";

async function getView(req, res) {
  const file = await db.getFile(req.user.id, req.params?.id);
  const owner = await db.getUser(file.owner);

  file.owner = owner.username;

  if ((file === null) | (file === undefined)) {
    res.redirect("/not-found");
    return;
  }

  res.render("view-file", {
    user: req.user,
    file: file,
  });
}

export default { getView };
