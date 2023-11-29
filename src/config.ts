import process from "node:process";
import dotenv from "dotenv";
dotenv.config();

export const config = {
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_PORT: process.env.MYSQL_PORT,
  MYSQL_HOST: process.env.MYSQL_HOST,
  PORT: process.env.PORT,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXP_IN: process.env.ACCESS_TOKEN_EXP_IN,
  REFRESH_TOKEN_EXP_IN: process.env.REFRESH_TOKEN_EXP_IN,
};
