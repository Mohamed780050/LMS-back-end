import express from "express";
import authValidatorMW from "../middlewares/authValidatorMW.js";
import authControl from "../controller/authControl.js";
const router = express.Router();
router.route("/teacher").post(authValidatorMW, authControl.teacherLogin);
router.route("/student").post(authValidatorMW, authControl.studentLogin);
export default router;
