import { Router } from "express";
import { authentification } from "../middlewares/auth";

const storageRouter = Router();

storageRouter.post("/file/upload", authentification);
storageRouter.get("/file/list", authentification);
storageRouter.delete("/file/delete/:id", authentification);
storageRouter.get("/file/:id", authentification);
storageRouter.get("/file/download/:id", authentification);
storageRouter.put("/file/update/:id", authentification);

export default storageRouter;
