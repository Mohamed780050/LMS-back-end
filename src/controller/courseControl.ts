import Course from "../models/courseModel.js";
import { Request, Response } from "express";
async function getACourse(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ data: "id is required" });
      return;
    }
    const response = await Course.getACourse(id);
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Internal server Error" });
  }
}
async function addANewCourse(req: Request, res: Response) {
  try {
    const [courseName, teacherId] = [req.body.courseName, req.params.userId];
    if (!courseName || !teacherId) {
      res.status(400).json({ data: "course name and teacher id are required" });
    }
    const course = new Course(courseName, teacherId);
    const response = await course.createACourse();
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Internal server Error" });
  }
}
async function deleteACourse(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ data: "id is required" });
      return;
    }
    const response = await Course.deleteACourse(id);
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Internal server error" });
  }
}
export default { getACourse, addANewCourse, deleteACourse };
