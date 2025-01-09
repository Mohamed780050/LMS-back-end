import { teacherInterface } from "../interfaces/interfaces";
import teacherModel from "./database/teacher.js";
export default class Teacher implements teacherInterface {
  userName: string;
  password: string;
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
      const response = await teacherModel.find();
      if (response.length === 0)
        return { statusCode: 404, data: "No teachers in the data base" };
      return { statusCode: 200, data: response };
    } catch (err) {
      console.log(err);
    }
  }
  async saveTeacher() {
    try {
      await teacherModel.create(this);
      return { statusCode: 201, data: "Teacher created" };
    } catch (err) {
      console.log(err);
      return { statusCode: 400, data: "something went wrong" };
    }
  }
}
