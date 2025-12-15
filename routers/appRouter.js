import { Router } from "express";

import handleLogInRouting from "./logInRouter.js";
import signUpRouter from "./signUpRouter.js";
import uploadRouter from "./uploadRouter.js";
import appController from "../controllers/generalController.js";

export function handleRouting(passport) {
  const appRouter = Router();

  appRouter.get("/", appController.getHome);
  appRouter.use("/sign-up", signUpRouter);
  appRouter.use("/log-in", handleLogInRouting(passport));
  appRouter.use("/upload", uploadRouter);
  appRouter.get("/log-out", appController.getLogOut);

  appRouter.all("/{*lost}", appController.getPageNotFound);

  return appRouter;
}
