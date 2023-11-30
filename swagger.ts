import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "AERO API",
    description: "AERO test",
  },
  servers: [
    {
      url: "http://localhost:8000",
      description: "",
    },
    {
      url: "https://uppity-island-production.up.railway.app",
      description: "",
    },
  ],
  security: [{ bearerAuth: [] }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["src/routes/auth.ts", "src/routes/storage.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
