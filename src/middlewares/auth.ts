import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import JWTService from "../services/jwt";

export const authentification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = JWTService.decodePayload(token);
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: decoded.id },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    JWTService.verifyAccessToken(token, user.sessionKey);
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(403).json({ message: "Access token is invalid" });
    }
    return res.status(403).json({ message: "Forbidden" });
  }

  req.user = {
    id: (user as JwtPayload).id,
  };
  next();
};
