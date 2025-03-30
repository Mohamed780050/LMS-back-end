import express from "express";
import JWTverifyMW from "../middlewares/JWTverifyMW.js";
import chapterControl from "../controller/chapterControl.js";
const router = express.Router();
router.route("/").post(JWTverifyMW, chapterControl.addNewChapter);
router
  .route("/:chapterId")
  .get(JWTverifyMW, chapterControl.getAChapter)
  .delete(JWTverifyMW, chapterControl.deleteChapter);
router.post(
  "/:chapterId/ChapterName",
  JWTverifyMW,
  chapterControl.UpdateChapterName
);
router.post(
  "/:chapterId/chapterDescription",
  JWTverifyMW,
  chapterControl.UpdateChapterDescription
);
router.post("/:chapterId/access", JWTverifyMW, chapterControl.changeVisibility);
router.post("/:chapterId/video", JWTverifyMW, chapterControl.changeVideo);
router.post("/:chapterId/publish", JWTverifyMW, chapterControl.publishChapter);
router.post("/reorder",JWTverifyMW,chapterControl.reorderChapters);
router.get("/:chapterId/student",JWTverifyMW,chapterControl.getChapterForStudent)
router.get("/chapters/:courseId",JWTverifyMW,chapterControl.getChaptersForStudent);
router.post("/:chapterId/complete",JWTverifyMW,chapterControl.completeChapter)
export default router;
