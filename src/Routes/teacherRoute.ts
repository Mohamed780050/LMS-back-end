import express from "express";
import teacherControl from "../controller/teacherControl.js";
import teacherValidatorMW from "../middlewares/teacherValidatorMW.js";
const router = express.Router();
router
  .route("/")
  .get(teacherControl.getAllTeachers)
  .post(teacherValidatorMW, teacherControl.addNewTeacher);
export default router;
