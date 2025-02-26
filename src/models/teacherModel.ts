import { teacherInterface } from "../interfaces/interfaces";
import { sendVerificationEmail } from "../utils/emails/email.js";
import generateVerificationCode from "../utils/generateVerificationCode.js";
import teacherDB from "./database/teacher.js";
import bcrypt from "bcrypt";
export default class Teacher
  implements
    Omit<
      teacherInterface,
      | "refreshToken"
      | "isVerified"
      | "resetPasswordToken"
      | "resetPasswordTokenExpire"
      | "verificationCode"
      | "verificationCodeExpire"
    >
{
  password: string;
  userName: string;
  email: string;
  avatar: string;
  courses: string[];
  students: string[];
  constructor(
    userName: string,
    password: string,
    email: string,
    avatar: string,
    courses: string[],
    students: string[]
  ) {
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.avatar = avatar;
    this.courses = courses;
    this.students = students;
  }
  static async getAllTeachers() {
    try {
      const response = await teacherDB.find();
      if (response.length === 0)
        return { statusCode: 404, data: "No teachers in the data base" };
      return { statusCode: 200, data: response };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "server Error" };
    }
  }
  async saveTeacher() {
    try {
      const checkTheTeacher = await teacherDB.findOne({
        $or: [{ email: this.email }, { userName: this.userName }],
      });
      if (checkTheTeacher) {
        return { statusCode: 400, data: "The email or username is already taken" };
      }
      const hashedPassword = await bcrypt.hash(this.password, 10);
      const verificationCode = generateVerificationCode();
      const teacher = await teacherDB.create({
        userName: this.userName,
        email: this.email,
        password: hashedPassword,
        avatar: this.avatar,
        courses: this.courses,
        students: this.students,
        verificationCode,
        verificationCodeExpire: Date.now() + 2 * 60 * 60 * 1000,
      });
      await sendVerificationEmail(teacher.email,verificationCode)
      return { statusCode: 201, data: "Teacher created" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "something went wrong" };
    }
  }
}
