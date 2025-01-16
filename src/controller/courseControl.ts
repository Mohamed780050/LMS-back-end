import Course from "../models/courseModel";
import { Request, Response } from "express";
async function getAllCourses(req: Request, res: Response) {
  try {
    const response = await Course.getAllCourses();
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
  }
}

export default { getAllCourses };
