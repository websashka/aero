import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { File } from "./entities/File";
import { config } from "./config";
import process from "node:process";

const migrationPath =
  process.env.NODE_ENV === "production"
    ? "dist/migrations/*.js"
    : "src/migrations/*.ts";
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "monorail.proxy.rlwy.net",
  port: 59926,
  username: "railway",
  password: "kCxfK5eeTgaQ5A0a6RcGX!v*ZDyWOl0D",
  database: "railway",
  synchronize: false,
  migrationsRun: true,
  logging: true,
  entities: [User, File],
  migrations: [migrationPath],
  subscribers: [],
});
