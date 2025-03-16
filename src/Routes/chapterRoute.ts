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
export default router;
