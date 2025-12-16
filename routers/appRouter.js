import { Router } from "express";

import handleLogInRouting from "./logInRouter.js";
import signUpRouter from "./signUpRouter.js";
import filesystemRouter from "./filesystemRouter.js";
import uploadRouter from "./uploadRouter.js";
import appController from "../controllers/generalController.js";
import authController from "../controllers/authenticationController.js";

export function handleRouting(passport) {
  const appRouter = Router();

  appRouter.get("/", appController.getHome);
  appRouter.use("/sign-up", signUpRouter);
  appRouter.use("/log-in", handleLogInRouting(passport));
  appRouter.use("/filesystem", filesystemRouter);
  appRouter.use("/upload", authController.authenticateUser, uploadRouter);
  appRouter.get("/log-out", appController.getLogOut);

  appRouter.all("/{*lost}", appController.getPageNotFound);

  return appRouter;
}
