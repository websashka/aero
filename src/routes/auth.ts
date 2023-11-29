import { Router } from "express";
import AuthController from "../controllers/auth";
import { authentification } from "../middlewares/auth";

const authRouter = Router();

authRouter.post("/signin", AuthController.login);
authRouter.post("/signin/new_token", AuthController.refresh);
authRouter.post("/signup", AuthController.signup);
authRouter.get("/logout", authentification, AuthController.logout);
authRouter.get("/info", authentification, AuthController.getInfo);

export default authRouter;
