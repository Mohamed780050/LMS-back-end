import express from "express"
import courseControl from "../controller/courseControl.js"
const router = express.Router()
router.route("/").get(courseControl.getAllCourses).post(courseControl.addANewCourse)
export default router