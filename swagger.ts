import swaggerAutogen from "swagger-autogen";
import process from "node:process";

const doc = {
  info: {
    title: "AERO API",
    description: "AERO test",
  },
  host: process.env.DOMAIN || "localhost:8000",
};

const outputFile = "./swagger-output.json";
const routes = ["src/routes/auth.ts", "src/routes/storage.ts"];

swaggerAutogen()(outputFile, routes, doc);
