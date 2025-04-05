import express from "express";
import studentControl from "../controller/studentControl.js";
import studentValidatorMW from "../middlewares/studentValidatorMW.js";
import JWTverifyMW from "../middlewares/JWTverifyMW.js";
const router = express.Router();
router
  .route("/")
  .get(studentControl.getAllStudents)
  .post(studentValidatorMW, studentControl.addNewStudent);
router.get("/infoCard", JWTverifyMW,studentControl.getInfoCard)
export default router;
