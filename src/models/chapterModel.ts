import chapterDB from "./database/chapter.js";
import validateIds from "../utils/validateMongoId.js";
import courseDB from "./database/course.js";
import teacherDB from "./database/teacher.js";
import { chapterInterface } from "../interfaces/interfaces.js";
import studentBD from "./database/student.js";
import purchaseDB from "./database/purchase.js";
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
        $push: { chapters: chapter._id },
      });
      return { statusCode: 201, data: "chapter created" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
  async getAllOfMyChapter() {
    try {
      const validate = validateIds([this.courseId, this.teacherId]);
      if (!validate) return { statusCode: 400, data: "use Valid id" };
      const [findCourse, findTeacher] = [
        await courseDB.findById(this.courseId, { chapters: 1 }).lean(),
        await teacherDB.findById(this.teacherId, { _id: 1 }).lean(),
      ];
      if (!findCourse) return { statusCode: 404, data: "course not found" };
      if (!findTeacher) return { statusCode: 404, data: "teacher not found" };
      const chapters = await chapterDB.find({ courseId: this.courseId });
      return { statusCode: 200, data: chapters };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
  async getAChapter(chapterId: string) {
    try {
      const validate = validateIds([this.teacherId, chapterId]);
      if (!validate) return { statusCode: 400, data: "use Valid id" };
      const [findTeacher, findChapter] = [
        await teacherDB.findById(this.teacherId, { _id: 1 }).lean(),
        await chapterDB.findById(chapterId).lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher not found" };
      if (!findChapter) return { statusCode: 404, data: "chapter not found" };

      return { statusCode: 200, data: findChapter };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
  async deleteChapter(chapterId: string) {
    try {
      const validate = validateIds([this.teacherId, chapterId]);
      if (!validate) return { statusCode: 400, data: "use Valid id" };
      const [findTeacher, findChapter] = [
        await teacherDB.findById(this.teacherId, { _id: 1, courses: 1 }).lean(),
        await chapterDB.findById(chapterId).lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher not found" };
      if (!findChapter) return { statusCode: 404, data: "chapter not found" };
      const findCourseId = findTeacher.courses.find(
        (course) => course === findChapter.courseId
      );
      if (!findCourseId) return { statusCode: 403, data: "Not your course" };
      await chapterDB.deleteOne({ _id: chapterId });
      await courseDB.updateOne(
        { _id: findCourseId },
        { $pull: { chapters: chapterId } }
      );
      return { statusCode: 200, data: "Chapter deleted" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
  async updateChapterName(chapterId: string, chapterName: string) {
    try {
      const validate = validateIds([this.teacherId, chapterId]);
      if (!validate) return { statusCode: 400, data: "use Valid id" };
      const [findTeacher, findChapter] = [
        await teacherDB.findById(this.teacherId, { _id: 1, courses: 1 }).lean(),
        await chapterDB.findById(chapterId).lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher not found" };
      if (!findChapter) return { statusCode: 404, data: "chapter not found" };
      const findCourseId = findTeacher.courses.find(
        (course) => course === findChapter.courseId
      );
      if (!findCourseId) return { statusCode: 403, data: "Not your course" };
      await chapterDB.updateOne(
        { _id: chapterId },
        { $set: { chapterName: chapterName } }
      );
      return { statusCode: 200, data: "Chapter deleted" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
  async updateChapterDescription(chapterId: string, description: string) {
    try {
      const validate = validateIds([this.teacherId, chapterId]);
      if (!validate) return { statusCode: 400, data: "use Valid id" };
      const [findTeacher, findChapter] = [
        await teacherDB.findById(this.teacherId, { _id: 1, courses: 1 }).lean(),
        await chapterDB.findById(chapterId).lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher not found" };
      if (!findChapter) return { statusCode: 404, data: "chapter not found" };
      const findCourseId = findTeacher.courses.find(
        (course) => course === findChapter.courseId
      );
      if (!findCourseId) return { statusCode: 403, data: "Not your course" };
      if (findChapter.description === "")
        await chapterDB.updateOne(
          { _id: chapterId },
          { $set: { description, completed: findChapter.completed + 1 } }
        );
      else
        await chapterDB.updateOne(
          { _id: chapterId },
          { $set: { description } }
        );
      return { statusCode: 200, data: "Chapter description updated" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
  async changeVisibility(chapterId: string, isFree: boolean) {
    try {
      const validate = validateIds([this.teacherId, chapterId]);
      if (!validate) return { statusCode: 400, data: "use Valid id" };
      const [findTeacher, findChapter] = [
        await teacherDB.findById(this.teacherId, { _id: 1, courses: 1 }).lean(),
        await chapterDB.findById(chapterId).lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher not found" };
      if (!findChapter) return { statusCode: 404, data: "chapter not found" };
      const findCourseId = findTeacher.courses.find(
        (course) => course === findChapter.courseId
      );
      if (!findCourseId) return { statusCode: 403, data: "Not your course" };
      await chapterDB.updateOne({ _id: chapterId }, { $set: { isFree } });
      return { statusCode: 200, data: "Chapter description updated" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
  async changeVideo(chapterId: string, url: string) {
    try {
      const validate = validateIds([this.teacherId, chapterId]);
      if (!validate) return { statusCode: 400, data: "use Valid id" };
      const [findTeacher, findChapter] = [
        await teacherDB.findById(this.teacherId, { _id: 1, courses: 1 }).lean(),
        await chapterDB.findById(chapterId).lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher not found" };
      if (!findChapter) return { statusCode: 404, data: "chapter not found" };
      const findCourseId = findTeacher.courses.find(
        (course) => course === findChapter.courseId
      );
      if (!findCourseId) return { statusCode: 403, data: "Not your course" };
      if (findChapter.video.url === "")
        await chapterDB.updateOne(
          { _id: chapterId },
          {
            $set: { video: { url: url }, completed: findChapter.completed + 1 },
          }
        );
      else
        await chapterDB.updateOne(
          { _id: chapterId },
          { $set: { video: { url: url } } }
        );
      return { statusCode: 200, data: "Chapter video updated" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
  async publish(chapterId: string, isPublished: boolean) {
    try {
      const validate = validateIds([this.teacherId, chapterId]);
      if (!validate) return { statusCode: 400, data: "use Valid id" };
      const [findTeacher, findChapter] = await Promise.all([
        teacherDB.findById(this.teacherId, { _id: 1, courses: 1 }).lean(),
        chapterDB.findById(chapterId).lean(),
      ]);
      if (!findTeacher) return { statusCode: 404, data: "teacher not found" };
      if (!findChapter) return { statusCode: 404, data: "chapter not found" };
      const findCourseId = findTeacher.courses.find(
        (course) => course === findChapter.courseId
      );
      if (!findCourseId) return { statusCode: 403, data: "Not your course" };
      if (typeof isPublished !== "boolean")
        return { statusCode: 400, data: "isPublished must be boolean value" };
      await chapterDB.updateOne({ _id: chapterId }, { $set: { isPublished } });
      const myCourse = await courseDB
        .findById(findCourseId, { chapters: 1, isPublished: 1, completed: 1 })
        .populate("chapters", "isPublished")
        .lean();
      if (!myCourse) return { statusCode: 404, data: "Course Not found" };
      const hasPublishedChapter = myCourse.chapters.some(
        (chapter: any) => chapter.isPublished
      );
      const PublishedChapter = myCourse.chapters.filter(
        (chapter: any) => chapter.isPublished
      );
      console.log(PublishedChapter);
      if (
        hasPublishedChapter &&
        PublishedChapter.length === 1 &&
        myCourse.completed <= 4
      )
        await courseDB.findOneAndUpdate(
          { _id: findCourseId },
          { $set: { completed: myCourse.completed + 1 } }
        );
      if (!hasPublishedChapter)
        await courseDB.findOneAndUpdate(
          { _id: findCourseId },
          { $set: { completed: myCourse.completed - 1, isPublished: false } }
        );
      return { statusCode: 200, data: "Chapter video updated" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
  async reorder(newReorder: { _id: string; position: number }[]) {
    try {
      const validate = validateIds([this.teacherId]);
      if (!validate) return { statusCode: 400, data: "use Valid id" };
      const [findTeacher] = [
        await teacherDB.findById(this.teacherId, { _id: 1, courses: 1 }).lean(),
      ];
      if (!findTeacher) return { statusCode: 404, data: "teacher not found" };
      newReorder.map(async (chapter) => {
        await chapterDB.findOneAndUpdate(
          { _id: chapter._id },
          { $set: { position: chapter.position } }
        );
      });
      return { statusCode: 200, data: "Chapter Reordered" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
  async getChapterForStudent(chapterId: string) {
    try {
      const studentId = this.teacherId;
      const validate = validateIds([studentId, chapterId]);
      if (!validate) return { statusCode: 400, data: "use Valid id" };
      const [findStudent, findChapter] = await Promise.all([
        studentBD.findById(this.teacherId, { _id: 1 }).lean(),
        chapterDB
          .findOne(
            { _id: chapterId, isPublished: true },
            { completed: 0, total: 0 }
          )
          .lean(),
      ]);
      if (!findStudent) return { statusCode: 404, data: "student not found" };
      if (!findChapter) return { statusCode: 404, data: "chapter not found" };
      const findPurchase = await purchaseDB.findOne({
        studentId: findStudent._id,
        courseId: findChapter.courseId,
      });
      console.log(findPurchase);
      if (findPurchase)
        return { statusCode: 200, data: { ...findChapter, enroll: true } };
      else return { statusCode: 200, data: { ...findChapter, enroll: false } };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
  async getChaptersForStudent(courseId: string) {
    try {
      const studentId = this.teacherId;
      const validate = validateIds([courseId, studentId]);
      if (!validate) return { statusCode: 400, data: "use Valid id" };
      const [findStudent, findCourse] = await Promise.all([
        studentBD.findById(studentId, { _id: 1 }).lean(),
        courseDB.findById(courseId, { completed: 0, total: 0 }).lean(),
      ]);
      if (!findStudent) return { statusCode: 404, data: "student not found" };
      if (!findCourse) return { statusCode: 404, data: "course not found" };
      const findPurchase = await purchaseDB.findOne({
        studentId: findStudent._id,
        courseId: courseId,
      });
      const chapters = await chapterDB
        .find(
          {
            courseId: courseId,
            isPublished: true,
          },
          { _id: 1 }
        )
        .sort({ position: 1 });
      console.log(chapters);
      if (findPurchase)
        return { statusCode: 200, data: { chapters, enroll: true } };
      else return { statusCode: 200, data: { chapters, enroll: false } };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal server error" };
    }
  }
}
