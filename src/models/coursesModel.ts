import courseDB from "./database/course.js";
import teacherDB from "./database/teacher.js";
import mongoose from "mongoose";

export default class Courses {
  teacherId: string;
  constructor(teacherId: string) {
    this.teacherId = teacherId;
  }
  async getTeacherCourses() {
    try {
      const isObjectId = mongoose.Types.ObjectId.isValid(this.teacherId);
      if (!isObjectId)
        return { statusCode: 400, data: "Teacher ID is not valid" };
      const findTeacher = await teacherDB.findById(this.teacherId);
      if (!findTeacher) return { statusCode: 404, data: "Teacher Not found" };
      const teacherCourses = await courseDB.find({ teacherId: this.teacherId });
      return { statusCode: 200, data: teacherCourses };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
}
