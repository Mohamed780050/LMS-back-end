import courseDB from "./database/course";
import { courseInterface } from "../interfaces/interfaces";

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
  static async getAllCourses() {
    try {
      const courses = await courseDB.find();
      if (courses.length === 0)
        return { statusCode: 204, data: "there is no courses" };
      return { statusCode: 200, data: courses };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal Server Error" };
    }
  }
}

export default Course;
