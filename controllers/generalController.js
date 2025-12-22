import { validationResult } from "express-validator";

import { validatePost } from "./validationController.js";
import * as db from "../db/queries.js";

async function getHome(req, res) {
  const props = {
    user: req.user,
  };

  res.render("index", props);
}

function getLogOut(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
}

function getPageNotFound(req, res) {
  res.status(404).render("notfound");
}

export default {
  getHome,
  getLogOut,
  getPageNotFound,
};
