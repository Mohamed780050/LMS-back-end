import express from "express";
import JWTverifyMW from "../middlewares/JWTverifyMW.js";
import coursesController from "../controller/coursesControl.js";
const router = express.Router();
router.route("/").get(JWTverifyMW, coursesController.getAllCourses);
router
  .route("/teacherCourse")
  .get(JWTverifyMW, coursesController.getTeacherCourses);
router.get("/courseNumber", JWTverifyMW, coursesController.getCoursesNumber);
router.get("/published", JWTverifyMW, coursesController.getAllPublishedCourses);
router.get("/enrolled", JWTverifyMW, coursesController.getAllEnrolledCourses);
export default router;
