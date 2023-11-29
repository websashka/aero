import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "AERO API",
    description: "AERO test",
  },
  host: "localhost:8000",
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/auth.ts", "./routes/storage.ts"];

swaggerAutogen()(outputFile, routes, doc).then(async () => {
  await import("./index");
});
