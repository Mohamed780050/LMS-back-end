import express from "express";
import teacherControl from "../controller/teacherControl.js";
import teacherValidatorMW from "../middlewares/teacherValidatorMW.js";
import JWTverifyMW from "../middlewares/JWTverifyMW.js";
const router = express.Router();
router
  .route("/")
  .get(teacherControl.getAllTeachers)
  .post(teacherValidatorMW, teacherControl.addNewTeacher);
router.route("/infoCard").get(JWTverifyMW,teacherControl.getInfoCard)
export default router;
