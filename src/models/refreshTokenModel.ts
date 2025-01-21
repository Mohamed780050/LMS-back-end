import jwt from "jsonwebtoken";
import teacherDB from "./database/teacher.js";
import studentDB from "./database/student.js";
import { refreshTokenPayloadInterface } from "../interfaces/interfaces";
import dotenv from "dotenv";
dotenv.config();
export default class RefreshToken {
  refreshToken: string;
  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
  async refreshTokenForTeacher() {
    try {
      const payload = jwt.verify(
        this.refreshToken,
        `${process.env.REFRESH_TOKEN_SECRET}`
      ) as refreshTokenPayloadInterface;
      const findTeacher = await teacherDB.findById(`${payload.userId}`);
      // TODO: make sure to change the data string
      if (!findTeacher) return { status: 400, data: "not working" };
      if (findTeacher.refreshToken !== this.refreshToken)
        return { status: 400, data: "not working" };
      const accessToken = jwt.sign(
        { userId: payload.userId },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        { expiresIn: process.env.ACCESS_TOKEN_AGE }
      );
      return { status: 200, data: { accessToken } };
    } catch (err) {
      console.log(err);
      return { status: 500, data: "internal server error" };
    }
  }
  async refreshTokenForStudent() {
    try {
      const payload = jwt.verify(
        this.refreshToken,
        `${process.env.REFRESH_TOKEN_SECRET}`
      ) as refreshTokenPayloadInterface;
      const findStudent = await studentDB.findById(`${payload.userId}`, {
        refreshToken: 1,
      });
      // TODO: make sure to change the data string
      if (!findStudent) return { status: 400, data: "not working" };
      if (findStudent.refreshToken !== this.refreshToken)
        return { status: 401, data: "Unauthorized" };
      const accessToken = jwt.sign(
        { userId: payload.userId },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        { expiresIn: process.env.ACCESS_TOKEN_AGE }
      );
      return { status: 200, data: { accessToken } };
    } catch (err) {
      console.log(err);
      return { status: 500, data: "internal server error" };
    }
  }
}
