import courseDB from "./database/course.js";
// import { courseInterface } from "../interfaces/interfaces";
import teacherDB from "./database/teacher.js";
import mongoose, { Mongoose } from "mongoose";
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
  static async updateName(
    courseId: string,
    teacherId: string,
    courseName: string
  ) {
    try {
      const [checkTeacherId, checkCourseId] = [
        mongoose.Types.ObjectId.isValid(teacherId),
        mongoose.Types.ObjectId.isValid(courseId),
      ];
      if (!checkCourseId || !checkTeacherId)
        return { statusCode: 400, data: "Not a Valid id" };
      const [findTeacher, findCourse] = [
        await teacherDB.findById(teacherId, { _id: 1 }).lean(),
        await courseDB.findById(courseId, { teacherId: 1 }).lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher Not found" };
      if (!findCourse) return { statusCode: 404, data: "course Not found" };
      // checking if the teacher owns the course
      if (findTeacher._id.toString() !== findCourse.teacherId)
        return { statusCode: 404, data: "Not your course" };
      const checkOnCourseName = await courseDB.find({ courseName: courseName });
      if (checkOnCourseName.length)
        return { statusCode: 400, data: "Chose another course name" };
      await courseDB.findByIdAndUpdate(courseId, {
        $set: { courseName: courseName },
      });
      return { statusCode: 200, data: "course name updated" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal Server Error" };
    }
  }
  static async updateDescription(
    courseId: string,
    teacherId: string,
    courseDescription: string
  ) {
    try {
      const [checkTeacherId, checkCourseId] = [
        mongoose.Types.ObjectId.isValid(teacherId),
        mongoose.Types.ObjectId.isValid(courseId),
      ];
      if (!checkCourseId || !checkTeacherId)
        return { statusCode: 400, data: "Not a Valid id" };
      const [findTeacher, findCourse] = [
        await teacherDB.findById(teacherId, { _id: 1 }).lean(),
        await courseDB.findById(courseId, { teacherId: 1 }).lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher Not found" };
      if (!findCourse) return { statusCode: 404, data: "course Not found" };
      // checking if the teacher owns the course
      if (findTeacher._id.toString() !== findCourse.teacherId)
        return { statusCode: 404, data: "Not your course" };
      await courseDB.findByIdAndUpdate(courseId, {
        $set: { description: courseDescription },
      });
      return { statusCode: 200, data: "course name updated" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal Server Error" };
    }
  }
  static async updateCategory(
    courseId: string,
    teacherId: string,
    courseCategory: string
  ) {
    try {
      const [checkTeacherId, checkCourseId] = [
        mongoose.Types.ObjectId.isValid(teacherId),
        mongoose.Types.ObjectId.isValid(courseId),
      ];
      if (!checkCourseId || !checkTeacherId)
        return { statusCode: 400, data: "Not a Valid id" };
      const [findTeacher, findCourse] = [
        await teacherDB.findById(teacherId, { _id: 1 }).lean(),
        await courseDB.findById(courseId, { teacherId: 1 }).lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher Not found" };
      if (!findCourse) return { statusCode: 404, data: "course Not found" };
      // checking if the teacher owns the course
      if (findTeacher._id.toString() !== findCourse.teacherId)
        return { statusCode: 404, data: "Not your course" };
      await courseDB.findByIdAndUpdate(courseId, {
        $set: { category: courseCategory },
      });
      return { statusCode: 200, data: "course name updated" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal Server Error" };
    }
  }
  static async updatePrice(
    courseId: string,
    teacherId: string,
    coursePrice: number
  ) {
    try {
      const [checkTeacherId, checkCourseId] = [
        mongoose.Types.ObjectId.isValid(teacherId),
        mongoose.Types.ObjectId.isValid(courseId),
      ];
      if (!checkCourseId || !checkTeacherId)
        return { statusCode: 400, data: "Not a Valid id" };
      const [findTeacher, findCourse] = [
        await teacherDB.findById(teacherId, { _id: 1 }).lean(),
        await courseDB.findById(courseId, { teacherId: 1 }).lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher Not found" };
      if (!findCourse) return { statusCode: 404, data: "course Not found" };
      // checking if the teacher owns the course
      if (findTeacher._id.toString() !== findCourse.teacherId)
        return { statusCode: 404, data: "Not your course" };
      await courseDB.findByIdAndUpdate(courseId, {
        $set: { price: coursePrice },
      });
      return { statusCode: 200, data: "course name updated" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal Server Error" };
    }
  }
}

export default Course;
