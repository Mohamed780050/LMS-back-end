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
        sameSite: "none",
      });
    }
    res
      .status(response.statusCode)
      .json(
        typeof response.data === "object"
          ? { accessToken: response.data.accessToken }
          : response.data
      );
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Inter server Error" });
  }
}
async function studentLogin(req: Request, res: Response) {
  try {
    const { identifier, password } = req.body;
    const student = new Auth(identifier, password);
    const response = await student.studentLogin();
    if (typeof response.data === "object") {
      res.set("accessToken", response.data.accessToken);
      res.cookie("refreshToken", response.data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
    }
    res
      .status(response.statusCode)
      .json(
        typeof response.data === "object"
          ? { accessToken: response.data.accessToken }
          : response.data
      );
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Inter server Error" });
  }
}

export default { studentLogin, teacherLogin };
