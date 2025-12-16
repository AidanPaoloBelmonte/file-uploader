import { Router } from "express";

import filesystemController from "../controllers/filesystemController.js";
import authenticationController from "../controllers/authenticationController.js";

const filesystemRouter = Router();

filesystemRouter.get(
  "/:user",
  authenticationController.authenticateOwner,
  filesystemController.getFilesystem,
);
filesystemRouter.get(
  "/",
  authenticationController.authenticateUser,
  filesystemController.getFilesystemBase,
);

export default filesystemRouter;
