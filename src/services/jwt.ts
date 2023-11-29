import jwt from "jsonwebtoken";
import { config } from "../config";

export interface IUserPayload {
  id: string;
}

class JWTService {
  /**
   * @throws JsonWebTokenError
   */
  signAccessToken(payload: IUserPayload, sessionKey: string): string {
    return jwt.sign(payload, this.createAccessSecret(sessionKey), {
      expiresIn: config.ACCESS_TOKEN_EXP_IN,
    }) as string;
  }

  signRefreshToken(payload: IUserPayload, sessionKey: string): string {
    return jwt.sign(payload, this.createRefreshSecret(sessionKey), {
      expiresIn: config.REFRESH_TOKEN_EXP_IN,
    }) as string;
  }

  /**
   * @throws JsonWebTokenError
   */
  verifyAccessToken(token: string, personalKey: string): IUserPayload {
    return jwt.verify(
      token,
      this.createAccessSecret(personalKey),
    ) as unknown as IUserPayload;
  }

  verifyRefreshToken(token: string, personalKey: string): IUserPayload {
    return jwt.verify(
      token,
      this.createRefreshSecret(personalKey),
    ) as unknown as IUserPayload;
  }

  decodePayload(token: string): IUserPayload {
    return jwt.decode(token) as unknown as IUserPayload;
  }

  private createAccessSecret(personalKey: string): string {
    return `${config.ACCESS_TOKEN_SECRET}${personalKey}`;
  }

  private createRefreshSecret(personalKey: string): string {
    return `${config.REFRESH_TOKEN_SECRET}${personalKey}`;
  }
}

export default new JWTService();
