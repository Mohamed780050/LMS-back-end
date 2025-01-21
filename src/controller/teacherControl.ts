import { Request, Response } from "express";
import Teacher from "../models/teacherModel.js";

async function getAllTeachers(req: Request, res: Response) {
  try {
    const response = await Teacher.getAllTeachers();
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Inter server error" });
  }
}
async function addNewTeacher(req: Request, res: Response) {
  try {
    const { userName, password, email, avatar, courses, students } = req.body;
    if (!userName || !password || !email) {
      res
        .status(400)
        .json({ message: "Please provide all the required fields" });
      return;
    }
    const teacher = new Teacher(
      userName,
      password,
      email,
      avatar ? avatar : "",
      courses ? courses : [],
      students ? students : []
    );
    const response = await teacher.saveTeacher();
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Inter server error" });
  }
}
export default { getAllTeachers, addNewTeacher };
