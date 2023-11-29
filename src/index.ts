import "reflect-metadata";
import express from "express";

import { AppDataSource } from "./data-source";
import authRouter from "./routes/auth";
import storageRouter from "./routes/storage";
import { error } from "./middlewares/error";
import { config } from "./config";

const app = express();
app.use(express.json());
app.use(error);
app.use(authRouter);
app.use(storageRouter);

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
