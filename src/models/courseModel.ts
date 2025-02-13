import courseDB from "./database/course.js";
// import { courseInterface } from "../interfaces/interfaces";
import teacherDB from "./database/teacher.js";
import mongoose from "mongoose";
type CourseType = { courseName: string; teacherId: string };
class Course implements CourseType {
  courseName: string;
  teacherId: string;
  constructor(courseName: string, teacherId: string) {
    this.courseName = courseName;
    this.teacherId = teacherId;
  }
  static async getACourse(courseId: string) {
    try {
      const course = await courseDB.findById(`${courseId}`);
      if (!course) return { statusCode: 404, data: "there is no course" };
      return { statusCode: 200, data: course };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal Server Error" };
    }
  }
  async createACourse() {
    try {
      // check if the course exists
      const checkCourseName = await courseDB.find({
        courseName: this.courseName,
      });
      if (checkCourseName.length)
        return { statusCode: 400, data: "Use another course name" };
      // check if the id is valid
      const isObjectId = mongoose.Types.ObjectId.isValid(this.teacherId);
      if (!isObjectId) return { statusCode: 400, data: "Use a valid id" };
      // check if the teacher is in the data base
      const checkTheTeacherId = await teacherDB.findById(this.teacherId);
      if (!checkTheTeacherId)
        return { statusCode: 400, data: "Teacher doesn't appear" };
      const newCourse = await courseDB.create({
        courseName: this.courseName,
        teacherId: this.teacherId,
      });
      await teacherDB.findByIdAndUpdate(`${this.teacherId}`, {
        $push: { courses: newCourse._id.toString() },
      });
      return { statusCode: 201, data: newCourse._id.toString() };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal Server Error" };
    }
  }
  static async deleteACourse(courseId: string) {
    try {
      const course = await courseDB.findById(`${courseId}`);
      if (!course) return { statusCode: 204, data: "there is no course" };
      const teacher = await teacherDB.findById(`${course.teacherId}`);
      if (!teacher) return { statusCode: 400, data: "Your are not a teacher" };
      if (!teacher.courses.includes(course._id.toString()))
        return { statusCode: 400, data: "This is not your course" };
      await courseDB.deleteOne({ _id: course._id });
      return { statusCode: 200, data: `${course.courseName} is deleted` };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal Server Error" };
    }
  }
}

export default Course;
