import { validationResult } from "express-validator";

import { validatePost } from "./validationController.js";
import * as db from "../db/queries.js";

async function getHome(req, res) {
  // const posts = await db.fetchPosts(
  //   10,
  //   req?.user?.membership || req?.user?.isadmin,
  // );

  const props = {
    user: req.user,
    // posts: posts,
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

const postNewMessage = [
  validatePost,
  async (req, res, next) => {
    const errors = {};
    validationResult(req).errors.forEach((err) => {
      errors[err.path] = err.msg;
    });

    if (Object.keys(errors).length > 0) {
      return res.status(400).render("/", {
        errors: errors,
      });
    }

    await db.addPost(req.user, req.body.post);

    res.redirect("/");
  },
];

async function postDeletePost(req, res) {
  await db.deletePost(req.params?.id);

  res.redirect("/");
}

function getPageNotFound(req, res) {
  res.status(404).render("notfound");
}

export default {
  getHome,
  getLogOut,
  postNewMessage,
  postDeletePost,
  getPageNotFound,
};
