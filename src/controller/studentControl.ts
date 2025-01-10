import { Request, Response } from "express";
import Student from "../models/studentModel.js";

async function getAllStudents(req: Request, res: Response) {
  try {
    const response = await Student.getAllStudents();
    res.status(response.statusCode).json({ message: response.data });
  } catch (err) {
    console.log(err);
  }
}
async function addNewStudent(req: Request, res: Response) {
  try {
    const { userName, password, email, avatar, courses, students } = req.body;
    if (!userName || !password || !email) {
      res
        .status(400)
        .json({ message: "Please provide all the required fields" });
      return;
    }
    const student = new Student(userName, email, password);
    const response = await student.saveStudent();
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
  }
}
export default { getAllStudents, addNewStudent };
