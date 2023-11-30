import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";
import JWTService from "../services/jwt";

class AuthController {
  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).send("Access Denied. No refresh token provided.");
    }
    const { id } = JWTService.decodePayload(refreshToken);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    try {
      JWTService.verifyRefreshToken(refreshToken, user.sessionKey);
      const accessToken = JWTService.signAccessToken(
        { id: user.id },
        user.sessionKey,
      );
      const newRefreshToken = JWTService.signRefreshToken(
        { id: user.id },
        user.sessionKey,
      );
      return res
        .status(200)
        .json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      return res.status(400).send("Invalid refresh token.");
    }
  }

  async logout(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.sessionKey = await bcrypt.genSalt(6);
    await userRepository.save(user);
    res.status(200).json({});
  }

  async getInfo(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({ login: user.login });
  }

  async signup(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(500).json({ message: "Login and password required." });
    }

    const existedUser = await userRepository.findOne({
      where: {
        login,
      },
    });

    if (existedUser) {
      return res.status(400).json({
        message: "User with this login already exist.",
      });
    }

    const encryptedPassword = bcrypt.hashSync(password, 12);
    const user = new User();
    user.login = login;
    user.password = encryptedPassword;
    user.sessionKey = await bcrypt.genSalt(6);

    await userRepository.save(user);

    const accessToken = JWTService.signAccessToken(
      { id: user.id },
      user.sessionKey,
    );
    const refreshToken = JWTService.signRefreshToken(
      { id: user.id },
      user.sessionKey,
    );

    return res.status(200).json({ accessToken, refreshToken });
  }
  async login(req: Request, res: Response) {
    try {
      const { login, password } = req.body;
      if (!login || !password) {
        return res
          .status(500)
          .json({ message: "Login and password required." });
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { login } });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(404).json({ message: "Password invalid." });
      }

      const accessToken = JWTService.signAccessToken(
        { id: user.id },
        user.sessionKey,
      );
      const refreshToken = JWTService.signRefreshToken(
        { id: user.id },
        user.sessionKey,
      );

      return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }
}

export default new AuthController();
