import { Request, Response } from "express";
import Courses from "../models/coursesModel.js";
async function getTeacherCourses(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { search, page } = req.query;
    if (!userId) {
      res.status(400).json({ data: "Teacher ID is required" });
      return;
    }
    if (typeof page !== "string") {
      res
        .status(400)
        .json({ data: "Page must be a string that contain a number" });
      return;
    }
    if (isNaN(parseInt(page))) {
      res.status(400).json({ data: "Page must be an int number" });
      return;
    }
    const teacherCourses = new Courses(userId);
    const response = await teacherCourses.getTeacherCourses(page, `${search}`);
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
async function getCoursesNumber(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ data: "Teacher ID is required" });
      return;
    }
    const teacherCourses = new Courses(userId);
    const response = await teacherCourses.getCoursesNumber(
      `${req.query.search}`
    );
    res.status(response.statusCode).json(response.data);
  } catch (err) {
    console.log(err);
  }
}
async function getAllPublishedCourses(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { query, page, category } = req.query;
    if (!userId) {
      res.status(400).json({ data: "Teacher ID is required" });
      return;
    }
    const pageNumber = parseInt(`${page}`);
    if (isNaN(pageNumber)) {
      res.status(400).json({ data: "page is not a number" });
    }
    const response = await Courses.getAllPublishedCourses(
      `${query}`,
      pageNumber,
      `${category}`
    );
    res.status(response.statusCode).json(response.data);
  } catch (err) {
    console.log(err);
  }
}
async function getAllEnrolledCourses(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ data: "Teacher ID is required" });
      return;
    }
    const response = await Courses.getAllEnrolledCourses(userId);
    res.status(response.statusCode).json(response.data);
  } catch (err) {
    console.log(err);
  }
}
export default {
  getTeacherCourses,
  getAllCourses,
  getCoursesNumber,
  getAllPublishedCourses,
  getAllEnrolledCourses,
};
