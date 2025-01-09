import teacherModel from "./database/teacher.js";
import { authInterface } from "../interfaces/interfaces";
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
      const user = await teacherModel.findOne({
        $or: [{ userName: this.identifier }, { email: this.identifier }],
      });
      if (!user)
        return { statusCode: 404, data: "Invalid identifier or password" };
      // check on password
      const passwordValidate = await bcrypt.compare(
        this.password,
        user.password
      );
      if (!passwordValidate)
        return { statusCode: 404, data: "Invalid identifier or password" };
      const Token = jwt.sign({ userId: user._id }, `${process.env.JWTSecret}`);
      return { statusCode: 200, data: { jwt: Token } };
    } catch (err) {
      console.log(err);
      return { statusCode: 400, data: "something went wrong" };
    }
  }
}
export default Auth;
