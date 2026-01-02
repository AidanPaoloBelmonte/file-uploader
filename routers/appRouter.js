import { Router } from "express";

import handleLogInRouting from "./logInRouter.js";
import signUpRouter from "./signUpRouter.js";
import filesystemRouter from "./filesystemRouter.js";
import moveController from "../controllers/moveController.js";
import deleteController from "../controllers/deleteController.js";
import viewController from "../controllers/viewController.js";
import uploadController from "../controllers/uploadController.js";
import createController from "../controllers/createController.js";
import appController from "../controllers/generalController.js";
import authController from "../controllers/authenticationController.js";

import multer from "multer";

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: uploadController.handleStorage,
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILESIZE),
  },
});

export function handleRouting(passport) {
  const appRouter = Router();

  appRouter.get("/", appController.getHome);
  appRouter.use("/sign-up", signUpRouter);
  appRouter.use("/log-in", handleLogInRouting(passport));
  appRouter.use("/filesystem", filesystemRouter);
  appRouter.post(
    "/uploads{/*folder}",
    authController.authenticateUser,
    upload.single("file"),
    uploadController.postUploadError,
    uploadController.postUpload,
  );
  appRouter.post(
    "/create{/*folder}",
    authController.authenticateUser,
    createController.postCreate,
  );
  appRouter.get(
    "/view/:id",
    authController.authenticateUser,
    viewController.getView,
  );
  appRouter.post(
    "/move",
    authController.authenticateUser,
    moveController.postMove,
  );
  appRouter.post(
    "/delete",
    authController.authenticateUser,
    deleteController.postDelete,
  );
  appRouter.get("/log-out", appController.getLogOut);

  appRouter.all("/{*lost}", appController.getPageNotFound);

  return appRouter;
}
