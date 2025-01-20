import express from "express";
import courseControl from "../controller/courseControl.js";
import JWTverifyMW from "../middlewares/JWTverifyMW.js";
const router = express.Router();
router
  .route("/")
  .get(JWTverifyMW, courseControl.getAllCourses)
  .post(JWTverifyMW,courseControl.addANewCourse);
export default router;
