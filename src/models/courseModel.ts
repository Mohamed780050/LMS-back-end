import { deleteImage, uploadImage } from "../utils/upload/cloudinary.config.js";
import validateIds from "../utils/validateMongoId.js";
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
      const validId = validateIds([courseId]);
      if (!validId) return { statusCode: 400, data: "In valid id" };
      const course = await courseDB
        .findById(`${courseId}`)
        .populate({
          path: "chapters",
          select: "chapterName isFree isPublished position",
          options: { sort: { position: 1 } },
        })
        .lean();
      if (!course) return { statusCode: 404, data: "there is no course" };
      return { statusCode: 200, data: course };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal Server Error" };
    }
  }
  async createACourse() {
    //    TODO: Orphaned Course Creation
    // In createACourse, if the teacher update fails after creating the course, the course remains orphaned.
    // Fix: Add manual rollback logic:
    try {
      // check if the course exists
      const validId = validateIds([this.teacherId]);
      if (!validId) return { statusCode: 400, data: "In valid id" };
      const checkCourseName = await courseDB
        .find({
          courseName: this.courseName,
        })
        .lean();
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
  static async deleteACourse(courseId: string, teacherId: string) {
    try {
      const validId = validateIds([courseId, teacherId]);
      if (!validId) return { statusCode: 400, data: "In valid id" };
      const course = await courseDB
        .findById(`${courseId}`, {
          _id: 1,
          teacherId: 1,
        })
        .lean();
      if (!course) return { statusCode: 404, data: "there is no course" };
      const teacher = await teacherDB.findById(`${teacherId}`).lean();
      if (!teacher) return { statusCode: 400, data: "Your are not a teacher" };
      if (course.teacherId !== teacher._id.toString())
        return { statusCode: 403, data: "This is not your course" };
      await courseDB.deleteOne({ _id: course._id });
      await teacherDB.findByIdAndUpdate(teacherId, {
        $pull: { courses: courseId },
      });
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
      const validId = validateIds([courseId, teacherId]);
      if (!validId) return { statusCode: 400, data: "In valid id" };
      const [findTeacher, findCourse] = [
        await teacherDB.findById(teacherId, { _id: 1 }).lean(),
        await courseDB.findById(courseId, { teacherId: 1 }).lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher Not found" };
      if (!findCourse) return { statusCode: 404, data: "course Not found" };
      // checking if the teacher owns the course
      if (findTeacher._id.toString() !== findCourse.teacherId)
        return { statusCode: 403, data: "Not your course" };
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
      const validId = validateIds([courseId, teacherId]);
      if (!validId) return { statusCode: 400, data: "In valid id" };
      const [findTeacher, findCourse] = [
        await teacherDB.findById(teacherId, { _id: 1 }).lean(),
        await courseDB
          .findById(courseId, { teacherId: 1, completed: 1, description: 1 })
          .lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher Not found" };
      if (!findCourse) return { statusCode: 404, data: "course Not found" };
      // checking if the teacher owns the course
      if (findTeacher._id.toString() !== findCourse.teacherId)
        return { statusCode: 403, data: "Not your course" };
      console.log(findCourse.completed);
      if (findCourse.description === "")
        await courseDB.findByIdAndUpdate(courseId, {
          $set: {
            description: courseDescription,
            completed: findCourse.completed + 1,
          },
        });
      else
        await courseDB.findByIdAndUpdate(courseId, {
          $set: {
            description: courseDescription,
          },
        });
      return { statusCode: 200, data: "course Description updated" };
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
      const validId = validateIds([courseId, teacherId]);
      if (!validId) return { statusCode: 400, data: "In valid id" };
      const [findTeacher, findCourse] = [
        await teacherDB.findById(teacherId, { _id: 1 }).lean(),
        await courseDB
          .findById(courseId, { teacherId: 1, category: 1, completed: 1 })
          .lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher Not found" };
      if (!findCourse) return { statusCode: 404, data: "course Not found" };
      // checking if the teacher owns the course
      if (findTeacher._id.toString() !== findCourse.teacherId)
        return { statusCode: 403, data: "Not your course" };
      if (findCourse.category === "")
        await courseDB.findByIdAndUpdate(courseId, {
          $set: {
            category: courseCategory,
            completed: findCourse.completed + 1,
          },
        });
      else
        await courseDB.findByIdAndUpdate(courseId, {
          $set: {
            category: courseCategory,
          },
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
      if (coursePrice < 0)
        return { statusCode: 400, data: "the number is negative" };
      const validId = validateIds([courseId, teacherId]);
      if (!validId) return { statusCode: 400, data: "In valid id" };
      const [findTeacher, findCourse] = [
        await teacherDB.findById(teacherId, { _id: 1 }).lean(),
        await courseDB.findById(courseId, { teacherId: 1 }).lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher Not found" };
      if (!findCourse) return { statusCode: 404, data: "course Not found" };
      // checking if the teacher owns the course
      if (findTeacher._id.toString() !== findCourse.teacherId)
        return { statusCode: 403, data: "Not your course" };
      await courseDB.findByIdAndUpdate(courseId, {
        $set: { price: coursePrice },
      });
      return { statusCode: 200, data: "course price updated" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal Server Error" };
    }
  }
  static async updateImage(
    courseId: string,
    teacherId: string,
    courseImage: string
  ) {
    try {
      const validId = validateIds([courseId, teacherId]);
      if (!validId) return { statusCode: 400, data: "In valid id" };
      const [findTeacher, findCourse] = [
        await teacherDB.findById(teacherId, { _id: 1 }).lean(),
        await courseDB
          .findById(courseId, { teacherId: 1, completed: 1, image: 1 })
          .lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher Not found" };
      if (!findCourse) return { statusCode: 404, data: "course Not found" };
      // checking if the teacher owns the course
      if (findTeacher._id.toString() !== findCourse.teacherId)
        return { statusCode: 403, data: "Not your course" };
      console.log(findCourse.image?.secure_url);
      console.log(findCourse.image?.public_id);
      if (findCourse.image?.secure_url) {
        await deleteImage(findCourse.image.public_id);
      } else {
        await courseDB.findByIdAndUpdate(findCourse._id.toString(), {
          $set: { completed: findCourse.completed + 1 },
        });
      }
      const link = await uploadImage(courseImage);
      await courseDB.findByIdAndUpdate(courseId, {
        $set: {
          image: {
            public_id: link.public_id,
            url: link.url,
            secure_url: link.secure_url,
            width: link.width,
            height: link.height,
            format: link.format,
            resource_type: link.resource_type,
            created_at: link.created_at,
            size: link.bytes,
            // asset_folder: link.,
          },
        },
      });
      return { statusCode: 200, data: "course price updated" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal Server Error" };
    }
  }
  static async publish(
    courseId: string,
    teacherId: string,
    isPublished: boolean
  ) {
    try {
      const validId = validateIds([courseId, teacherId]);
      if (!validId) return { statusCode: 400, data: "In valid id" };
      if (typeof isPublished !== "boolean")
        return { statusCode: 400, data: "isPublished must be boolean value" };
      const [findTeacher, findCourse] = [
        await teacherDB.findById(teacherId, { _id: 1 }).lean(),
        await courseDB
          .findById(courseId, { teacherId: 1, completed: 1, isPublished: 1 })
          .lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher Not found" };
      if (!findCourse) return { statusCode: 404, data: "course Not found" };
      // checking if the teacher owns the course
      if (findTeacher._id.toString() !== findCourse.teacherId)
        return { statusCode: 403, data: "Not your course" };
      await courseDB.findByIdAndUpdate(courseId, { $set: { isPublished } });
      return { statusCode: 200, data: "course price updated" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal Server Error" };
    }
  }
}

export default Course;
