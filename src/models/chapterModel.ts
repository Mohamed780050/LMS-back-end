import chapterDB from "./database/chapter.js";
import validateIds from "../utils/validateMongoId.js";
import courseDB from "./database/course.js";
import teacherDB from "./database/teacher.js";
export default class Chapter {
  teacherId: string;
  courseId: string;
  constructor(teacherId: string, courseId: string) {
    this.courseId = courseId;
    this.teacherId = teacherId;
  }
  async save(chapterName: string) {
    try {
      const validate = validateIds([this.courseId, this.teacherId]);
      if (!validate) return { statusCode: 400, data: "use Valid id" };
      const [findCourse, findTeacher] = [
        await courseDB.findById(this.courseId, { chapters: 1 }).lean(),
        await teacherDB.findById(this.teacherId, { _id: 1 }).lean(),
      ];
      if (!findCourse) return { statusCode: 404, data: "course not found" };
      if (!findTeacher) return { statusCode: 404, data: "teacher not found" };
      const chapter = await chapterDB.create({
        chapterName: chapterName,
        teacherId: this.teacherId,
        courseId: this.courseId,
        position: findCourse.chapters.length + 1,
      });
      await courseDB.findByIdAndUpdate(this.courseId, {
        $push: { chapters: chapter._id.toString() },
      });
      return { statusCode: 201, data: "chapter created" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
}
