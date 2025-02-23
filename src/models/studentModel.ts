import studentBD from "./database/student.js";
import { studentInterface } from "../interfaces/interfaces";
import bcrypt from "bcrypt";
class Student
  implements
    Omit<
      studentInterface,
      | "refreshToken"
      | "isVerified"
      | "resetPasswordToken"
      | "resetPasswordTokenExpire"
      | "verificationCode"
      | "verificationCodeExpire"
    >
{
  userName: string;
  email: string;
  password: string;
  avatar: string | undefined;
  courses:
    | {
        courseId: string;
        done: boolean;
        chapters: { chapterId: string; done: boolean }[];
      }[]
    | undefined;
  constructor(userName: string, email: string, password: string) {
    this.userName = userName;
    this.email = email;
    this.password = password;
  }
  static async getAllStudents() {
    try {
      const response = await studentBD.find({});
      return { statusCode: 200, data: response };
    } catch (err) {
      console.log(err);
      return { statusCode: 400, data: "something went wrong" };
    }
  }
  async saveStudent() {
    try {
      // check if the user exists
      const checkStudent = await studentBD.findOne({ email: this.email });
      if (checkStudent) return { statusCode: 400, data: "Email already taken" };
      // hash the password
      const hashedPassword = await bcrypt.hash(this.password, 10);
      await studentBD.create({
        userName: this.userName,
        email: this.email,
        password: hashedPassword,
      });
      return { statusCode: 201, data: "student created" };
    } catch (err) {
      console.log(err);
      return { statusCode: 400, data: "something went wrong" };
    }
  }
}
export default Student;
