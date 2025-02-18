import { Request, Response } from "express";
import Courses from "../models/coursesModel.js";
async function getTeacherCourses(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { search } = req.query;
    console.log(search);
    if (!userId) {
      res.status(400).json({ data: "Teacher ID is required" });
      return;
    }
    const teacherCourses = new Courses(userId);
    const response = await teacherCourses.getTeacherCourses(`${search}`);
    res.status(response.statusCode).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}
async function getAllCourses(req: Request, res: Response) {
  try {
    const response = await Courses.getAllCourses();
    res.status(response.statusCode).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}
export default { getTeacherCourses, getAllCourses };
