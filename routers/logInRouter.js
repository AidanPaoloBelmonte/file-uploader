import { Router } from "express";

import logInController from "../controllers/logInController.js";

export default function handleLoginRouting(passport) {
  const logInRouter = Router();

  logInRouter.get("/", logInController.getLogIn);
  logInRouter.post(
    "/",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/log-in",
    }),
  );

  return logInRouter;
}
