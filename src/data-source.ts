import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { File } from "./entity/File";
import { config } from "./config";
import process from "node:process";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  username: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
  synchronize: true,
  logging: process.env.NODE_ENV === "development",
  entities: [User, File],
  migrations: [],
  subscribers: [],
});
