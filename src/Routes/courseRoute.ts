import express from "express";
import courseControl from "../controller/courseControl.js";
import JWTverifyMW from "../middlewares/JWTverifyMW.js";
const router = express.Router();
router.route("/").post(JWTverifyMW, courseControl.addANewCourse);
router
  .post("/edit/:id/courseName", JWTverifyMW, courseControl.updateCourseName)
  .post(
    "/edit/:id/courseDescription",
    JWTverifyMW,
    courseControl.updateCourseDescription
  )
  .post(
    "/edit/:id/courseCategory",
    JWTverifyMW,
    courseControl.updateCourseCategory
  )
  .post("/edit/:id/coursePrice", JWTverifyMW, courseControl.updateCoursePrice)
  .post("/edit/:id/courseImage", JWTverifyMW, courseControl.updateCourseImage)
  .post("/edit/:id/publish", JWTverifyMW, courseControl.publishCourse);
router
  .route("/:id")
  .get(JWTverifyMW, courseControl.getACourse)
  .delete(JWTverifyMW, courseControl.deleteACourse);
export default router;
