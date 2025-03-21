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
  static async getAllPublishedCourses(
    search: string,
    page: number,
    category: string
  ) {
    try {
      const publishedCourses = await courseDB.aggregate([
        {
          $match: {
            isPublished: true,
            courseName: { $regex: search, $options: "i" },
            category: { $regex: category, $options: "i" },
          },
        }, // Step 1: Filter published courses
        {
          $addFields: {
            chaptersObjectIds: {
              $map: {
                input: "$chapters", // Convert each string ID in chapters array
                as: "chapId",
                in: { $toObjectId: "$$chapId" }, // Convert to ObjectId
              },
            },
          },
        },
        {
          $lookup: {
            from: "chapters", // The actual collection name for chapters
            localField: "chaptersObjectIds", // Now using converted ObjectIds
            foreignField: "_id",
            as: "populatedChapters",
          },
        },
        {
          $project: {
            courseName: 1,
            category: 1,
            price: 1,
            image: { url: 1, secure_url: 1, width: 1, height: 1 },
            chapterPublished: {
              $size: {
                $filter: {
                  input: "$populatedChapters", // Use populated chapters
                  as: "chapter",
                  cond: { $eq: ["$$chapter.isPublished", true] }, // Count only published chapters
                },
              },
            },
          },
        },
        { $skip: (page - 1) * 10 },
        { $limit: 10 },
      ]);
      return { statusCode: 200, data: publishedCourses };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
}
