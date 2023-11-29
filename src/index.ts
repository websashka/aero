import "reflect-metadata";
import express from "express";
import swaggerUI from "swagger-ui-express";
import { AppDataSource } from "./data-source";
import authRouter from "./routes/auth";
import storageRouter from "./routes/storage";
import { error } from "./middlewares/error";
import { config } from "./config";
import doc from "./swagger-output.json";

const app = express();
app.use(express.json());
app.use(error);
app.use(authRouter);
app.use(storageRouter);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(doc));
app.get("/hc", (req, res) => {
  res.send("ok");
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(config.PORT, () => {
      console.log("Server is running on http://localhost:" + config.PORT);
    });
  })
  .catch((error) => console.log(error));
