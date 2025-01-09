import { Request, Response } from "express";
import Teacher from "../models/teacherModel.js";
async function getAllTeachers(req: Request, res: Response) {
  try {
    const response = await Teacher.getAllTeachers();
    const statusCode = response?.statusCode || 200;
    res.status(statusCode).json({ message: response?.data });
  } catch (err) {
    console.log(err);
  }
}
export default { getAllTeachers };
