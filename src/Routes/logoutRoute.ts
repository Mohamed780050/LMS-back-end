import express from "express";
import logoutControl from "../controller/logoutControl.js";
const router = express.Router();
router.route("/student").get(logoutControl.logoutStudent);
router.route("/teacher").get(logoutControl.logoutTeacher);
export default router;
