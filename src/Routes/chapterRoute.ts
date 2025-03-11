import express from "express";
import JWTverifyMW from "../middlewares/JWTverifyMW.js";
import chapterControl from "../controller/chapterControl.js";
const router = express.Router();
router.route("/").post(JWTverifyMW, chapterControl.addNewChapter);
router.route("/:courseId").get(JWTverifyMW, chapterControl.getChapters);
export default router;
