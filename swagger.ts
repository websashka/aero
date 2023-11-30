import swaggerAutogen from "swagger-autogen";
import process from "node:process";
// Todo
const host =
  process.env.NODE_ENV === "production"
    ? "https://uppity-island-production.up.railway.app/"
    : "localhost:8000";
const doc = {
  info: {
    title: "AERO API",
    description: "AERO test",
  },
  host,
};

const outputFile = "./swagger-output.json";
const routes = ["src/routes/auth.ts", "src/routes/storage.ts"];

swaggerAutogen()(outputFile, routes, doc);
