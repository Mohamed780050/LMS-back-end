import validateIds from "../utils/validateMongoId";
import courseDB from "./database/course";
import purchaseDB from "./database/purchase";
import studentBD from "./database/student";

export class Purchase {
  studentId: string;
  courseId: string;
  constructor(studentId: string, courseId: string) {
    this.courseId = courseId;
    this.studentId = studentId;
  }
  async save() {
    try {
      const validId = validateIds([this.courseId, this.studentId]);
      if (!validId) return { statusCode: 400, data: "Invalid ID" };
      const [findStudent, findCourse, existingPurchase] = await Promise.all([
        studentBD.findById(this.studentId, { _id: 1 }).lean(),
        courseDB.findById(this.courseId, { _id: 1 }).lean(),
        purchaseDB.findOne({
          studentId: this.studentId,
          courseId: this.courseId,
        }),
      ]);
      if (!findStudent) return { statusCode: 404, data: "student not found" };
      if (!findCourse) return { statusCode: 404, data: "course not found" };
      if (existingPurchase)
        return { statusCode: 400, data: "Course already purchased" };
      await purchaseDB.create({
        studentId: this.studentId,
        courseId: this.courseId,
        completedChapters: [],
      });
      await studentBD.findOneAndUpdate(
        { _id: this.studentId },
        { $addToSet: { courses: this.courseId } }
      );
      return { statusCode: 200, data: "Purchase successful" };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, data: "Internal Server Error" };
    }
  }
}
