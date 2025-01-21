import courseDB from "./database/course.js";
import { courseInterface } from "../interfaces/interfaces";
import teacherDB from "./database/teacher.js";
import mongoose from "mongoose";

class Course implements courseInterface {
  courseName: string;
  description: string;
  imageURL: string;
  price: number;
  isPublished: boolean;
  date: {
    normal: string;
    full: string;
  };
  rating: number;
  category: string;
  teacherId: string;
  completed: number;
  total: number;
  students: string[];
  chapters: string[];
  attachments: string[];
  constructor(
    courseName: string,
    description: string,
    imageURL: string,
    price: number,
    isPublished: boolean,
    date: {
      normal: string;
      full: string;
    },
    rating: number,
    category: string,
    teacherId: string,
    completed: number,
    total: number,
    students: string[],
    chapters: string[],
    attachments: string[]
  ) {
    this.courseName = courseName;
    this.description = description;
    this.imageURL = imageURL;
    this.price = price;
    this.isPublished = isPublished;
    this.date = date;
    this.rating = rating;
    this.category = category;
    this.teacherId = teacherId;
    this.completed = completed;
    this.total = total;
    this.students = students;
    this.chapters = chapters;
    this.attachments = attachments;
  }
  static async getACourse(courseId:string) {
    try {
      const courses = await courseDB.findById(`${courseId}`);
      if (!courses)
        return { statusCode: 204, data: "there is no courses" };
      return { statusCode: 200, data: courses };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal Server Error" };
    }
  }
  static async createACourse(courseName: string, teacherId: string) {
    try {
      // check if the course exists
      const checkCourseName = await courseDB.find({ courseName: courseName });
      if (checkCourseName.length)
        return { statusCode: 400, data: "Use another course name" };
      // check if the id is valid
      const isObjectId = mongoose.Types.ObjectId.isValid(teacherId);
      if (!isObjectId) return { statusCode: 400, data: "Use a valid id" };
      // check if the teacher is in the data base
      const checkTheTeacherId = await teacherDB.findById(teacherId);
      if (!checkTheTeacherId)
        return { statusCode: 400, data: "Teacher doesn't appear" };
      await courseDB.create({
        courseName: courseName,
        teacherId: teacherId,
      });
      return { statusCode: 201, data: "Course created" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal Server Error" };
    }
  }
}

export default Course;
