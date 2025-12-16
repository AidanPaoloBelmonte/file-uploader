import generalController from "./generalController.js";

import * as db from "../db/queries.js";

function authenticateUser(req, res, next) {
  if (!req.user) {
    generalController.getPageNotFound(req, res);
  } else {
    next();
  }
}

function authenticateOwner(req, res, next) {
  if (req.user.username != req.params.user) {
    generalController.getPageNotFound(req, res);
  } else {
    next();
  }
}

async function authenticateMembership(req, res, next) {
  const isMember = await db.checkMembership(req.user.username);
  if (!isMember) {
    generalController.getPageNotFound(req, res);
  } else {
    next();
  }
}

async function authenticateAdmin(req, res, next) {
  const isAdmin = await db.checkAdmin(req.user.username);
  if (!isAdmin) {
    generalController.getPageNotFound(req, res);
  } else {
    next();
  }
}

export default {
  authenticateUser,
  authenticateOwner,
  authenticateMembership,
  authenticateAdmin,
};
