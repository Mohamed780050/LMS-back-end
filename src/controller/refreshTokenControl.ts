import { Request, Response } from "express";
import RefreshToken from "../models/refreshTokenModel.js";
async function useRefreshTokenForTeacher(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(401).send("Unauthorized");
      return;
    }
    const newRefreshToken = new RefreshToken(refreshToken);
    const response = await newRefreshToken.refreshTokenForTeacher();
    res.status(response.status).json(response.data);
  } catch (err) {
    console.log(err);
  }
}
async function useRefreshTokenForStudent(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(401).send("Unauthorized");
      return;
    }
    const newRefreshToken = new RefreshToken(refreshToken);
    const response = await newRefreshToken.refreshTokenForStudent();
    res.status(response.status).json(response.data);
  } catch (err) {
    console.log(err);
  }
}
export default { useRefreshTokenForStudent, useRefreshTokenForTeacher };
