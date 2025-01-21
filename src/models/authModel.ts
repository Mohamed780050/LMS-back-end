import teacherDB from "./database/teacher.js";
import studentBD from "./database/student.js";
import {
  authInterface,
  refreshTokenPayloadInterface,
} from "../interfaces/interfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
class Auth implements authInterface {
  identifier: string;
  password: string;
  constructor(identifier: string, password: string) {
    this.identifier = identifier;
    this.password = password;
  }
  async teacherLogin() {
    try {
      // check if the teacher is in the database
      const user = await teacherDB.findOne({
        $or: [{ userName: this.identifier }, { email: this.identifier }],
      });
      if (!user)
        return { statusCode: 400, data: "Invalid identifier or password" };
      // check on password
      const passwordValidate = await bcrypt.compare(
        this.password,
        user.password
      );
      if (!passwordValidate)
        return { statusCode: 404, data: "Invalid identifier or password" };
      const accessToken = jwt.sign(
        { userId: user._id },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        { expiresIn: process.env.ACCESS_TOKEN_AGE }
      );
      const refreshToken = jwt.sign(
        { userId: user._id },
        `${process.env.REFRESH_TOKEN_SECRET}`,
        { expiresIn: process.env.REFRESH_TOKEN_AGE }
      );
      await teacherDB.findByIdAndUpdate(`${user._id}`, {
        $set: { refreshToken: refreshToken },
      });
      return { statusCode: 200, data: { accessToken, refreshToken } };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "something went wrong" };
    }
  }
  async studentLogin() {
    try {
      const findStudent = await studentBD.findOne({
        $or: [{ userName: this.identifier }, { email: this.identifier }],
      });
      if (!findStudent)
        return { statusCode: 400, data: "Invalid identifier or password" };
      const checkPassword = await bcrypt.compare(
        this.password,
        findStudent.password
      );
      if (!checkPassword)
        return { statusCode: 400, data: "Invalid identifier or password" };
      const accessToken = jwt.sign(
        { userId: findStudent._id },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        { expiresIn: process.env.ACCESS_TOKEN_AGE }
      );
      const refreshToken = jwt.sign(
        { userId: findStudent._id },
        `${process.env.REFRESH_TOKEN_SECRET}`,
        { expiresIn: process.env.REFRESH_TOKEN_AGE }
      );
      await studentBD.findByIdAndUpdate(`${findStudent._id}`, {
        $set: { refreshToken: refreshToken },
      });
      return { statusCode: 200, data: { accessToken, refreshToken } };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "something went wrong" };
    }
  }
  static async teacherLogout(refreshToken: string) {
    try {
      const payload = jwt.verify(
        refreshToken,
        `${process.env.REFRESH_TOKEN_SECRET}`
      ) as refreshTokenPayloadInterface;
      const findTeacher = await teacherDB.findById(`${payload.userId}`, {
        refreshToken: 1,
      });
      if (!findTeacher) return { status: 204, data: "no content" };
      await teacherDB.findByIdAndUpdate(`${payload.userId}`, {
        $set: { refreshToken: "" },
      });
      return { status: 200, data: "logged out" };
    } catch (err) {
      console.log(err);
      return { status: 500, data: "Internal server error" };
    }
  }
  static async studentLogout(refreshToken: string) {
    try {
      const payload = jwt.verify(
        refreshToken,
        `${process.env.REFRESH_TOKEN_SECRET}`
      ) as refreshTokenPayloadInterface;
      const findStudent = await studentBD.findById(`${payload.userId}`, {
        refreshToken: 1,
      });
      if (!findStudent) return { status: 204, data: "no content" };
      await studentBD.findByIdAndUpdate(`${payload.userId}`, {
        $set: { refreshToken: "" },
      });
      return { status: 200, data: "logged out" };
    } catch (err) {
      console.log(err);
      return { status: 500, data: "Internal server error" };
    }
  }
}
export default Auth;
