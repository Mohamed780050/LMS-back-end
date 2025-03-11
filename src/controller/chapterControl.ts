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
export default { addNewChapter, getChapters };
