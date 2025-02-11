import express from "express";
import courseControl from "../controller/courseControl.js";
import JWTverifyMW from "../middlewares/JWTverifyMW.js";
const router = express.Router();
router
  .route("/")
  .post(JWTverifyMW, courseControl.addANewCourse)
  .get(JWTverifyMW, courseControl.getACourse)
  .delete(JWTverifyMW, courseControl.deleteACourse);
export default router;
