import { Request, Response } from "express";
import Auth from "../models/authModel.js";
async function teacherLogin(req: Request, res: Response) {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      res.status(400).json({ message: "check your inputs" });
      return;
    }
    const teacher = new Auth(identifier, password);
    const response = await teacher.teacherLogin();
    if (typeof response.data === "object") {
      res.set("accessToken", response.data.accessToken);
      res.cookie("refreshToken", response.data.refreshToken, {
        httpOnly: true,
        secure: true,
      });
    }
    res.status(response.statusCode).json(response.data);
  } catch (err) {
    console.log(err);
  }
}
async function studentLogin(req: Request, res: Response) {
  try {
  } catch (err) {
    console.log(err);
  }
}

export default { studentLogin, teacherLogin };
