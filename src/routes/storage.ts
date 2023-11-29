import { Router } from "express";
import { authentification } from "../middlewares/auth";
import StorageController from "../controllers/storage";
import { uploadFile } from "../middlewares/upload";

const storageRouter = Router();

storageRouter.post(
  "/file/upload",
  authentification,
  uploadFile.single("file"),
  StorageController.uploadFile,
);
storageRouter.get("/file/list", authentification, StorageController.getList);
storageRouter.delete(
  "/file/delete/:id",
  authentification,
  StorageController.deleteFile,
);
storageRouter.get("/file/:id", authentification, StorageController.getFile);
storageRouter.get(
  "/file/download/:id",
  authentification,
  StorageController.downloadFile,
);
storageRouter.put(
  "/file/update/:id",
  authentification,
  StorageController.updateFile,
);

export default storageRouter;
