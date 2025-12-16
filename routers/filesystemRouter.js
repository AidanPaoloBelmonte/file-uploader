import { Router } from "express";

import filesystemController from "../controllers/filesystemController.js";
import authenticationController from "../controllers/authenticationController.js";

const filesystemRouter = Router();

filesystemRouter.get(
  "/",
  authenticationController.authenticateUser,
  filesystemController.getFilesystemBase,
);
filesystemRouter.get(
  `/:user{/*folder}`,
  authenticationController.authenticateOwner,
  filesystemController.getFilesystem,
);

export default filesystemRouter;
