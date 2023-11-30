import swaggerAutogen from "swagger-autogen";
// Todo
const host = "https://uppity-island-production.up.railway.app/";
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
