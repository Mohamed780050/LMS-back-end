import { Request, Response } from "express";
import Teacher from "../models/teacherModel.js";
import teacherModel from "../models/database/teacher.js";

async function getAllTeachers(req: Request, res: Response) {
  try {
    const response = await Teacher.getAllTeachers();
    const statusCode = response?.statusCode || 200;
    res.status(statusCode).json({ message: response?.data });
  } catch (err) {
    console.log(err);
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
    const checkTheTeacher = await teacherModel.findOne({ email: email });
    if (checkTheTeacher) {
      res.status(400).json({ message: "The email is already taken" });
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
    const statusCode = response?.statusCode || 204;
    res.status(statusCode).json({ message: response?.data });
  } catch (err) {
    console.log(err);
  }
}
export default { getAllTeachers, addNewTeacher };
