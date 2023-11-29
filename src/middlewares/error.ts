import { Response } from "express";

export const error = (error: Error, res: Response) => {
  console.error(`Error: ${error.message}`);
  return res.status(500).json({ message: "Internal server error" });
};
