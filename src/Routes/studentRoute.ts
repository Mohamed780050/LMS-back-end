import express from "express";
import studentControl from "../controller/studentControl.js";
import studentValidatorMW from "../middlewares/studentValidatorMW.js";
const router = express.Router();
router
  .route("/")
  .get(studentControl.getAllStudents)
  .post(studentValidatorMW, studentControl.addNewStudent);
export default router;
