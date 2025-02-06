import { Request, Response } from "express";
import Courses from "../models/coursesModel.js";
async function getTeacherCourses(req: Request, res: Response) {
  try {
    const { teacherId } = req.params;
    if (!teacherId) {
      res.status(400).json({ data: "Teacher ID is required" });
      return;
    }
    const teacherCourses = new Courses(teacherId);
    const response = await teacherCourses.getTeacherCourses();
    res.status(response.statusCode).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}
export default { getTeacherCourses };
