declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: number;
      MYSQL_DATABASE: string;
      MYSQL_USER: string;
      MYSQL_PASSWORD: string;
      MYSQL_ROOT_PASSWORD: string;
      MYSQL_PORT: number;
      MYSQL_HOST: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      ACCESS_TOKEN_EXP_IN: string;
      REFRESH_TOKEN_EXP_IN: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
    }
  }

  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

export {};
