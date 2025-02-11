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
    res.status(500).json({data:"Internal server error"})
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
    res.status(500).json({data:"Internal server error"})
  }
}
export default { useRefreshTokenForStudent, useRefreshTokenForTeacher };
