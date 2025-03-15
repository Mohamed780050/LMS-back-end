import { Request, Response } from "express";
import Chapter from "../models/chapterModel.js";
async function addNewChapter(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { chapterName, courseId } = req.body;
    const myChapter = new Chapter(userId, courseId);
    const response = await myChapter.save(chapterName);
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "internal server Error" });
  }
}
async function getChapters(req: Request, res: Response) {
  try {
    const { userId, courseId } = req.params;
    console.log(userId, courseId);
    res.status(200).json({ data: [] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "internal server Error" });
  }
}
async function getAChapter(req: Request, res: Response) {
  try {
    const { userId, chapterId } = req.params;
    const myChapter = new Chapter(userId, chapterId);
    const response = await myChapter.getAChapter(chapterId);
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "internal server Error" });
  }
}
async function deleteChapter(req: Request, res: Response) {
  try {
    const { userId, chapterId } = req.params;
    if (!userId || !chapterId) {
      res.status(400).json({ data: "all fields are required" });
      return;
    }
    const myChapter = new Chapter(userId, "");
    const response = await myChapter.deleteChapter(chapterId);
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "internal server Error" });
  }
}
async function UpdateChapterName(req: Request, res: Response) {
  try {
    const { userId, chapterId } = req.params;
    const { chapterName } = req.body;
    if (!userId || !chapterId || !chapterName) {
      res.status(400).json({ data: "all fields are required" });
      return;
    }
    const myChapter = new Chapter(userId, "");
    const response = await myChapter.updateChapterName(chapterId, chapterName);
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "internal server Error" });
  }
}
async function UpdateChapterDescription(req: Request, res: Response) {
  try {
    const { userId, chapterId } = req.params;
    const { chapterDescription } = req.body;
    if (!userId || !chapterId || !chapterDescription) {
      res.status(400).json({ data: "all fields are required" });
      return;
    }
    const myChapter = new Chapter(userId, "");
    const response = await myChapter.updateChapterDescription(
      chapterId,
      chapterDescription
    );
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "internal server Error" });
  }
}

export default {
  addNewChapter,
  getChapters,
  getAChapter,
  deleteChapter,
  UpdateChapterName,
  UpdateChapterDescription,
};
