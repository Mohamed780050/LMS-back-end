import studentBD from "./database/student.js";
import { studentInterface } from "../interfaces/interfaces";
import bcrypt from "bcrypt";
import validateIds from "../utils/validateMongoId.js";
import purchaseDB from "./database/purchase.js";
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
  courses: [] | undefined;
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
  static async infoCard(studentId: string) {
    try {
      const validId = validateIds([studentId]);
      if (!validId) return { statusCode: 400, data: "something went wrong" };
      const [student, purchase] = await Promise.all([
        studentBD.findById(studentId, { _id: 1, courses: 1 }).lean(),
        purchaseDB.find({ studentId: studentId }).lean(),
      ]);

      console.log(student);
      if (!student) return { statusCode: 404, data: "student not found" };
      if (!purchase) return { statusCode: 404, data: "purchase not found" };
      // TODO: Remember to use grouping in here
      return {
        statusCode: 200,
        data: [
          purchase.filter(
            (course) => course.progress > 0 && course.progress !== 100
          ).length,
          // TODO: make sure to add completed instead of progress
          purchase.filter((course) => course.progress === 100).length,
          purchase.filter((course) => course.progress === 0).length,
          student.courses?.length,
        ],
      };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "something went wrong" };
    }
  }
}
export default Student;
