import Auth from "../models/authModel.js";
import { Request, Response } from "express";
async function logoutTeacher(req: Request, res: Response) {
  try {
    // TODO: remember to remove the token from the back-end too
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(204);
      return;
    }
    const response = await Auth.teacherLogout(refreshToken);
    res.clearCookie("refreshToken");
    res.status(response.status).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
}
async function logoutStudent(req: Request, res: Response) {
  try {
    // TODO: remember to remove the token from the back-end too
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(204);
      return;
    }
    const response = await Auth.studentLogout(refreshToken);
    res.clearCookie("refreshToken");
    res.status(response.status).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
}
export default { logoutTeacher, logoutStudent };
