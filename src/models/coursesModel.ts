import courseDB from "./database/course.js";
import teacherDB from "./database/teacher.js";
import mongoose from "mongoose";

export default class Courses {
  teacherId: string;
  constructor(teacherId: string) {
    this.teacherId = teacherId;
  }
  async getTeacherCourses(page: string, query?: string) {
    try {
      const isObjectId = mongoose.Types.ObjectId.isValid(this.teacherId);
      if (!isObjectId)
        return { statusCode: 400, data: "Teacher ID is not valid" };
      const findTeacher = await teacherDB.findById(this.teacherId);
      if (!findTeacher) return { statusCode: 404, data: "Teacher Not found" };
      const teacherCourses = await courseDB
        .find(
          {
            teacherId: this.teacherId,
            courseName: { $regex: `${query ? query : ""}`, $options: "i" },
          },
          {
            courseName: 1,
            category: 1,
            price: 1,
            isPublished: 1,
            rating: 1,
            studentsNumber: { $size: "$students" },
          }
        )
        .skip((parseInt(page) - 1) * 10)
        .limit(10);
      return { statusCode: 200, data: teacherCourses };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
  static async getAllCourses() {
    try {
      const courses = await courseDB.find({});
      return { statusCode: 200, data: courses };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
  async getCoursesNumber(search: string) {
    try {
      const isObjectId = mongoose.Types.ObjectId.isValid(this.teacherId);
      if (!isObjectId)
        return { statusCode: 400, data: "Teacher ID is not valid" };
      const findTeacher = await teacherDB.findById(this.teacherId);
      if (!findTeacher) return { statusCode: 404, data: "Teacher Not found" };
      const teacherCourses = await courseDB.countDocuments({
        teacherId: this.teacherId,
        courseName: { $regex: `${search ? search : ""}`, $options: "i" },
      });
      console.log(teacherCourses);
      return { statusCode: 200, data: teacherCourses };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
}
