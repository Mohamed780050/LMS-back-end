import express from "express";
import refreshTokenControl from "../controller/refreshTokenControl.js";
const router = express.Router();
router.route("/student").get(refreshTokenControl.useRefreshTokenForStudent);
router.route("/teacher").get(refreshTokenControl.useRefreshTokenForTeacher);
export default router;
