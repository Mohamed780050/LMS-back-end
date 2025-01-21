import Course from "../models/courseModel.js";
import { Request, Response } from "express";
async function getACourse(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await Course.getACourse(id);
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Internal server Error" });
  }
}
async function addANewCourse(req: Request, res: Response) {
  try {
    const { courseName, teacherId } = req.body;
    if (!courseName || !teacherId) {
      res.status(400).json({ data: "course name and teacher id are required" });
    }
    const response = await Course.createACourse(courseName, teacherId);
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Internal server Error" });
  }
}

export default { getACourse, addANewCourse };
